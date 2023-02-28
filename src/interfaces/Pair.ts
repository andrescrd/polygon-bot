import { PriceLookup } from './PriceLookup';

type FixDecimalPair = (data: Pick<PriceLookup, 'token0_1' | 'token1_0'>) => {
  token0_1: number;
  token1_0: number;
};

export interface IPair {
  Name: string;
  Amount: number;
  Disabled?: boolean;
  Uniswap: {
    PoolContract: string;
    DecimalToken0: number;
    DecimalToken1: number;
    PoolFee: number;
    FixDecimal?: FixDecimalPair;
  };
  Quickswap: {
    PoolContract: string;
    PoolFee: number;
    FixDecimal?: FixDecimalPair;
  };
}
