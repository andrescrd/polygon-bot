import { ethers } from 'ethers';

import { PAIRS } from './constants/pairs';
import QuoteManager from './managers/quoteManager';

require('dotenv').config();

// ============ Provider ============
const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER as string);

let runCounter = 0;
let oppCounter = 0;

// let nonceOffset = 0;
// async function getNonce(adr: string) {
//   const baseNonce = await provider.getTransactionCount(adr);
//   return baseNonce + nonceOffset++;
// }

const main = async () => {
  const quoteManager = QuoteManager(provider);
  //   const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
  //   const cntr = new ethers.Contract(process.env.CONTRACT_ADDRESS as string, CntrAbi, signer);

  // ============ MATIC/USDC ============
  {
    const { quickSwapData, uniswapV3PriceData } = await quoteManager.getQuotes(PAIRS.MATIC_USDC);
    quickSwapData.token0_1 *= 10 ** 12;
    quickSwapData.token1_0 /= 10 ** 12;

    const dat = await quoteManager.execute(600, [uniswapV3PriceData, quickSwapData]);

    if (dat) oppCounter++;
  }

  // ============ USDC/USDT ============
  {
    const { quickSwapData, uniswapV3PriceData } = await quoteManager.getQuotes(PAIRS.USDC_USDT);
    const dat: any = await quoteManager.execute(600, [uniswapV3PriceData, quickSwapData]);

    if (dat) oppCounter++;
  }

  runCounter++;
  console.log(`(${runCounter}/${oppCounter}) Finished. Awaiting next call.`);

  return true;
};

async function execute() {
  let canRun = true;

  setInterval(async () => {
    if (canRun) {
      canRun = false;
      canRun = await main();
    }
  }, 1000);
}

execute();
