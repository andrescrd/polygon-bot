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

  for (const [pairName] of Object.entries(PAIRS)) {
    try {
      if (PAIRS[pairName].Disabled) continue;

      // await audic.play();

      const dat = await quoteManager.execute(PAIRS[pairName].Amount, PAIRS[pairName]);
      if (dat) {
        list.push(dat);
        oppCounter++;
      }
    } catch (error) {
      console.log(error);
    }
  }

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
