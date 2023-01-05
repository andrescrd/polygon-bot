import { ethers } from 'ethers';

import { DEX } from '../constants/dex';

export async function poolToDex(contract: ethers.Contract) {
  const factory = await contract.functions.factory();
  const poolFactoryAddress = factory[0];

  switch (poolFactoryAddress) {
    case DEX.UniswapV3.PoolFactory:
      return DEX.UniswapV3.Name;
    case DEX.Quickstep.PoolFactory:
      return DEX.Quickstep.Name;
    case DEX.Firebird.PoolFactory:
      return DEX.Firebird.Name;
    default:
      return null;
  }
}

export async function poolToRouter(contract: ethers.Contract) {
  const factory = await contract.functions.factory();
  const poolFactoryAddress = factory[0];

  switch (poolFactoryAddress) {
    case DEX.UniswapV3.PoolFactory:
      return DEX.UniswapV3.PoolRouter;
    case DEX.Quickstep.PoolFactory:
      return DEX.Quickstep.PoolRouter;
    case DEX.Firebird.PoolFactory:
      return DEX.Firebird.PoolRouter;
    default:
      return null;
  }
}
