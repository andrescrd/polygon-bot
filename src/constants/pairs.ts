/* eslint-disable camelcase */
import { PairEnum } from '../enum/pairEnum';
import { IPair } from '../interfaces/Pair';

import { TOKENS } from './tokens';

export const PAIRS: { [pair: string]: IPair } = {
  [PairEnum.MATIC_USDC]: {
    // Disabled: true,
    Name: 'MATIC/USDC',
    Amount: 50,
    Uniswap: {
      // https://info.uniswap.org/#/polygon/pools/0xa374094527e1673a86de625aa59517c5de346d32
      PoolContract: '0xa374094527e1673a86de625aa59517c5de346d32',
      DecimalToken0: TOKENS.MATIC.Decimals,
      DecimalToken1: TOKENS.USDC.Decimals,
      PoolFee: 3000
    },
    Quickswap: {
      // https://info.quickswap.exchange/#/pair/0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827
      PoolContract: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827',
      PoolFee: 3000,
      FixDecimal: ({ token0_1, token1_0 }) => {
        return {
          token0_1: token0_1 * 10 ** 12,
          token1_0: token1_0 / 10 ** 12
        };
      }
    }
  },
  [PairEnum.USDC_USDT]: {
    // Disabled: true,
    Name: 'USDC/USDT',
    Amount: 1000,
    Uniswap: {
      // https://info.uniswap.org/#/polygon/pools/0x3f5228d0e7d75467366be7de2c31d0d098ba2c23
      PoolContract: '0x3f5228d0e7d75467366be7de2c31d0d098ba2c23',
      DecimalToken0: TOKENS.USDC.Decimals,
      DecimalToken1: TOKENS.USDT.Decimals,
      PoolFee: 3000
    },
    Quickswap: {
      // https://info.quickswap.exchange/#/pair/0x2cf7252e74036d1da831d11089d326296e64a728
      PoolContract: '0x2cf7252e74036d1da831d11089d326296e64a728',
      PoolFee: 3000
    }
  },
  [PairEnum.wMATIC_USDT]: {
    // Disabled: true,
    Name: 'wMATIC/USDT',
    Amount: 50,
    Uniswap: {
      // https://info.uniswap.org/#/polygon/pools/0x781067ef296e5c4a4203f81c593274824b7c185d
      PoolContract: '0x781067ef296e5c4a4203f81c593274824b7c185d',
      DecimalToken0: TOKENS.MATIC.Decimals,
      DecimalToken1: TOKENS.USDT.Decimals,
      PoolFee: 3000
    },
    Quickswap: {
      // https://info.quickswap.exchange/#/pair/0x604229c960e5cacf2aaeac8be68ac07ba9df81c3
      PoolContract: '0x604229c960e5cacf2aaeac8be68ac07ba9df81c3',
      PoolFee: 3000,
      FixDecimal: ({ token0_1, token1_0 }) => {
        return {
          token0_1: token0_1 * 10 ** 12,
          token1_0: token1_0 / 10 ** 12
        };
      }
    }
  },
  [PairEnum.BTC_ETH]: {
    // Disabled: true,
    Name: 'BTC/ETH',
    Amount: 0.1,
    Uniswap: {
      // https://info.uniswap.org/#/polygon/pools/0x50eaedb835021e4a108b7290636d62e9765cc6d7
      PoolContract: '0x50eaedb835021e4a108b7290636d62e9765cc6d7',
      DecimalToken0: TOKENS.BTC.Decimals,
      DecimalToken1: TOKENS.ETH.Decimals,
      PoolFee: 3000
    },
    Quickswap: {
      // https://info.quickswap.exchange/#/pair/0xdc9232e2df177d7a12fdff6ecbab114e2231198d
      PoolContract: '0xdc9232e2df177d7a12fdff6ecbab114e2231198d',
      PoolFee: 3000,
      FixDecimal: ({ token0_1, token1_0 }) => {
        return {
          token0_1: token0_1 / 10 ** 10,
          token1_0: token1_0 * 10 ** 10
        };
      }
    }
  },
  [PairEnum.BTC_ETH]: {
    // Disabled: true,
    Name: 'USDC/ETH',
    Amount: 1000,
    Uniswap: {
      // https://info.uniswap.org/#/polygon/pools/0x45dda9cb7c25131df268515131f647d726f50608
      PoolContract: '0x45dda9cb7c25131df268515131f647d726f50608',
      DecimalToken0: TOKENS.USDC.Decimals,
      DecimalToken1: TOKENS.ETH.Decimals,
      PoolFee: 3000
    },
    Quickswap: {
      // https://info.quickswap.exchange/#/pair/0x853ee4b2a13f8a742d64c8f088be7ba2131f670d
      PoolContract: '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d',
      PoolFee: 3000,
      FixDecimal: ({ token0_1, token1_0 }) => {
        return {
          token0_1: token0_1 / 10 ** 12,
          token1_0: token1_0 * 10 ** 12
        };
      }
    }
  }
};
