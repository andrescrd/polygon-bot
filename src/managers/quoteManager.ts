import { COLORS } from '../constants/colors';
import { PriceLookup } from '../interfaces/PriceLookup';
import { poolToDex, poolToRouter } from '../utils/poolTo';

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
  for (const [_, value] of Object.entries(priceList)) {
    tmpList.push({
      Exchange: await poolToDex(value.pool),
      'In / Out': value.token0_1,
      'Out / In': value.token1_0,
      'PoolFee (%)': value.poolFee / 10000
    });
  }
  console.table(tmpList);
}

const QuoteManager = {
  execute
};

export default QuoteManager;
