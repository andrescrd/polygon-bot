import { ethers } from 'ethers';

import { PAIRS } from './constants/pairs';
import QuoteManager from './managers/quoteManager';
import logger from './utils/logger';

require('dotenv').config();

let runCounter = 0;
let oppCounter = 0;

// let nonceOffset = 0;
// async function getNonce(adr: string) {
//   const baseNonce = await provider.getTransactionCount(adr);
//   return baseNonce + nonceOffset++;
// }

const main = async () => {
  let result: any[] = [];
  const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER as string);
  const quoteManager = QuoteManager(provider);

  //   const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
  //   const cntr = new ethers.Contract(process.env.CONTRACT_ADDRESS as string, CntrAbi, signer);

  const promiseResult = Object.entries(PAIRS)
    .map(([pairName]) => {
      try {
        if (!PAIRS[pairName].Disabled) {
          return quoteManager.execute(PAIRS[pairName].Amount, PAIRS[pairName]);
        }

        return null;
      } catch (error) {
        // console.log(error);
        logger.error('Error while executing the quote', error);
        return null;
      }
    })
    .filter((value) => !!value);

  try {
    result = [...(await Promise.all(promiseResult)).filter((value) => !!value)];
    oppCounter += result.length;

    runCounter++;
    // console.log(`(${runCounter}/${oppCounter}) Finished. Awaiting next call.`);
    logger.log(`(${runCounter}/${oppCounter}) Finished. Awaiting next call.`);
  } catch (error) {
    // console.log(error);
    logger.error('Error while executing the quote', error);
  }

  return {
    finished: true,
    result
  };
};

async function execute() {
  let canRun = true;

  setInterval(async () => {
    if (canRun) {
      canRun = false;
      const { finished } = await main();
      canRun = finished;
    }
  }, 1000);
}

execute();
