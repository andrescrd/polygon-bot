import { Contract } from 'ethers';

export interface PriceLookup {
  isV3: boolean;
  pool: Contract;
  token0_1: number;
  token1_0: number;
  poolFee: number;
}
