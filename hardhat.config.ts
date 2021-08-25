require('dotenv').config({ path: require('path').resolve('env', '.env.mock') });

import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';

import { HardhatUserConfig } from 'hardhat/types';

import { wallet } from './scripts/local/wallet';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    version: '0.7.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: 'none',
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: [
        {
          balance: '10000000000000000000000',
          privateKey: wallet.privateKey,
        },
      ],
    },
  },
  paths: {
    root: './scripts/local',
    artifacts: 'artifacts',
    sources: 'contracts',
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
};

export default config;
