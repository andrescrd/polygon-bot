export interface IPair {
  Name: string;
  Uniswap: {
    PoolContract: string;
    DecimalToken0: number;
    DecimalToken1: number;
    PoolFee: number;
  };
  Quickswap: {
    PoolContract: string;
    PoolFee: number;
  };
}
