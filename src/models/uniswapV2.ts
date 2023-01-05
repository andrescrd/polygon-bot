import { ethers } from 'ethers';

// Get the prices of a quickswap pair
async function getQuote(contract: ethers.Contract, poolFee: number, chainId = 137) {
  const reserves = await contract.functions.getReserves();

  return {
    isV3: false,
    pool: contract,
    token0_1: reserves._reserve1 / reserves._reserve0,
    token1_0: reserves._reserve0 / reserves._reserve1,
    // token0_1: (reserves._reserve1 / reserves._reserve0) * ((100 - poolFee / 10000) / 100),
    // token1_0: (reserves._reserve0 / reserves._reserve1) * ((100 - poolFee / 10000) / 100),
    poolFee
  };
}

const UniswapV2 = {
  getQuote
};

export default UniswapV2;
