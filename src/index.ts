import { ethers } from 'ethers';

import { PAIRS } from './constants/pairs';
import QuoteManager from './managers/quoteManager';

require('dotenv').config();

let runCounter = 0;
let oppCounter = 0;

// let nonceOffset = 0;
// async function getNonce(adr: string) {
//   const baseNonce = await provider.getTransactionCount(adr);
//   return baseNonce + nonceOffset++;
// }

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER as string);
  const quoteManager = QuoteManager(provider);
  const list = [];
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
        console.log(error);
        return null;
      }
    })
    .filter((value) => !!value);

  const result = (await Promise.all(promiseResult)).filter((value) => !!value).length;
  oppCounter += result;
  list.push(result);

  runCounter++;
  console.log(`(${runCounter}/${oppCounter}) Finished. Awaiting next call.`);

  return {
    finished: true,
    result: list
  };
};

async function execute() {
  let canRun = true;
  const list: any[] = [];

  setInterval(async () => {
    if (canRun) {
      canRun = false;
      const { finished, result } = await main();
      canRun = finished;
      list.push(result);
    }
  }, 1000);

  setInterval(() => {
    if (!list.length) {
      console.log('************** ALL RESULTS *******************');
      list.forEach((value) => console.log(value));
      console.log(`**********************************************`);
    }
  }, 30000);
}

execute();
