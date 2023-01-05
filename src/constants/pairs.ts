import { IPair } from '../interfaces/Pair';

import { TOKENS } from './tokens';

export const PAIRS: { [pair: string]: IPair } = {
  MATIC_USDC: {
    Name: 'MATIC/USDC',
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
  USDC_USDT: {
    Name: 'USDC/USDT',
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
  wMATIC_USDT: {
    Name: 'wMATIC/USDT',
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
        }
      }
    }
  }
};
