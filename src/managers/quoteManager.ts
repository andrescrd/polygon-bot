import { ethers } from 'ethers';

import { COLORS } from '../constants/colors';
import { IPair } from '../interfaces/Pair';
import { PriceLookup } from '../interfaces/PriceLookup';
import UniswapV2 from '../models/uniswapV2';
import UniswapV3 from '../models/uniswapV3';
import { IUniswapV2PairABI, IUniswapV3PoolABI } from '../utils/abis';
import { poolToDex, poolToRouter } from '../utils/poolTo';

const QuoteManager = (provider: any) => {
  const _provider = provider;

  function poolContract(address: string, abi: any) {
    return new ethers.Contract(address, abi, _provider);
  }

  async function getQuotes(pair: IPair) {
    console.log(pair.Name);

    const uniswapV3PriceData = await UniswapV3.getQuote(
      poolContract(pair.Uniswap.PoolContract, IUniswapV3PoolABI),
      pair.Uniswap.DecimalToken0,
      pair.Uniswap.DecimalToken1,
      pair.Uniswap.PoolFee
    );

    const quickSwapData = await UniswapV2.getQuote(
      poolContract(pair.Quickswap.PoolContract, IUniswapV2PairABI),
      pair.Quickswap.PoolFee
    );

    return { quickSwapData, uniswapV3PriceData };
  }

  async function execute(buyAmount: number, priceList: PriceLookup[]) {
    // Sort prices
    priceList.sort((a, b) => b.token0_1 - a.token0_1);

    // Identify where to buy and sell
    const buyAt = priceList[0];
    const sellAt = priceList[priceList.length - 1];

    await printTable(priceList);
    printSwapInfo(buyAmount, buyAt, sellAt);
    const netProfit = printProfit(buyAmount, buyAt, sellAt);

    // Return null if there is no profit
    if (netProfit <= 0) return null;

    return {
      buy: {
        router: await poolToRouter(buyAt.pool),
        tokenIn: '',
        poolFee: buyAt.poolFee,
        isV3: buyAt.isV3
      },
      sell: {
        router: await poolToRouter(sellAt.pool),
        tokenIn: '',
        poolFee: sellAt.poolFee,
        isV3: sellAt.isV3
      }
    };
  }

  return {
    getQuotes,
    execute
  };
};

function printProfit(buyAmount: number, buyAt: PriceLookup, sellAt: PriceLookup) {
  console.log(`${COLORS.FgBlue}============ Profit ============`);
  let netProfit = buyAmount * buyAt.token0_1 * sellAt.token1_0 - buyAmount;

  console.log(`${COLORS.FgRed}After Swaps: ${netProfit}`);

  // Flashloan premium
  netProfit -= buyAmount * 0.0009;
  console.log(`${COLORS.FgRed}After FL Premium: ${netProfit}`);

  // Padding
  if (parseFloat(process.env.PADDING as string) > 0) {
    netProfit -= netProfit * parseFloat(process.env.PADDING as string);
    console.log(`After: Padding: ${netProfit}`);
  }

  console.log(
    `${COLORS.FgBlue}========================\n${COLORS.FgGreen}Total: ${netProfit}${COLORS.Reset}\n`
  );

  return netProfit;
}

function printSwapInfo(buyAmount: number, buyAt: PriceLookup, sellAt: PriceLookup) {
  // ========================
  // xToken = TokenIn for BUY
  // yToken = TokenOut for BUY
  // ========================
  console.log(`${COLORS.FgBlue}============ Swaps ============`);
  console.log(
    `${COLORS.FgCyan}First Swap:\n - xToken: ${buyAmount} = yToken: ${buyAmount * buyAt.token0_1}`
  );
  console.log(
    `${COLORS.FgCyan}Second Swap:\n - yToken: ${buyAmount * buyAt.token0_1} = xToken: ${
      buyAmount * buyAt.token0_1 * sellAt.token1_0
    }`
  );
}

async function printTable(priceList: PriceLookup[]) {
  const tmpList = [];
  for (const [, value] of Object.entries(priceList)) {
    tmpList.push({
      Exchange: await poolToDex(value.pool),
      'In / Out': value.token0_1,
      'Out / In': value.token1_0,
      'PoolFee (%)': value.poolFee / 10000
    });
  }
  console.table(tmpList);
}

export default QuoteManager;
