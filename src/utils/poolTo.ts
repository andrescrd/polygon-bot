import { ethers } from 'ethers';

export async function poolToDex(contract: ethers.Contract) {
  const factory = await contract.functions.factory();

  switch (factory[0]) {
    case '0x1F98431c8aD98523631AE4a59f267346ea31F984':
      return 'UniswapV3';
    case '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32':
      return 'Quickswap';
    case '0x5De74546d3B86C8Df7FEEc30253865e1149818C8':
      return 'Firebird';
    default:
      return null;
  }
}

export async function poolToRouter(contract: ethers.Contract) {
  const factory = await contract.functions.factory();

  switch (factory[0]) {
    case '0x1F98431c8aD98523631AE4a59f267346ea31F984':
      return '0xE592427A0AEce92De3Edee1F18E0157C05861564';
    case '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32':
      return '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff';
    case '0x5De74546d3B86C8Df7FEEc30253865e1149818C8':
      return '0xF6fa9Ea1f64f1BBfA8d71f7f43fAF6D45520bfac';
    default:
      return null;
  }
}
