import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { Pool } from '@uniswap/v3-sdk';
import { ethers } from 'ethers';

import { Immutables } from '../interfaces/Immutables';
import { State } from '../interfaces/State';

// Get the prices of a uniswapv3 pair contract
async function getPrice(
  contract: ethers.Contract,
  token0Decimals: number,
  token1Decimals: number,
  poolFee: number,
  chainId = 137
) {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
    contract.factory(),
    contract.token0(),
    contract.token1(),
    contract.fee(),
    contract.tickSpacing(),
    contract.maxLiquidityPerTick()
  ]);

  const immutables: Immutables = { factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick };

  const [liquidity, slot] = await Promise.all([contract.liquidity(), contract.slot0()]);
  const state: State = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6]
  };

  const pool = new Pool(
    new Token(chainId, immutables.token0, token0Decimals),
    new Token(chainId, immutables.token1, token1Decimals),
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );

  const token0Amount = CurrencyAmount.fromRawAmount(pool.token0, 10 ** token0Decimals);
  const token1Amount = CurrencyAmount.fromRawAmount(pool.token1, 10 ** token1Decimals);

  return {
    isV3: true,
    pool: contract,
    // token0_1: parseFloat(pool.token0Price.quote(token0Amount).toExact()),
    // token1_0: parseFloat(pool.token1Price.quote(token1Amount).toExact()),
    token0_1:
      parseFloat(pool.token0Price.quote(token0Amount).toExact()) * ((100 - poolFee / 10000) / 100),
    token1_0:
      parseFloat(pool.token1Price.quote(token1Amount).toExact()) * ((100 - poolFee / 10000) / 100),
    poolFee
  };
}

const UniswapV3 = {
  getPrice
};

export default UniswapV3;
