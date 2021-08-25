import '@nomiclabs/hardhat-ethers';

import { utils } from 'ethers';
import fs from 'fs-extra';
import { ethers } from 'hardhat';
import path from 'path';

import { ERC20Mock } from './typechain/ERC20Mock';
import { Multicall } from './typechain/Multicall';
import { Multicall2 } from './typechain/Multicall2';
import { wallet } from './wallet';

(async function () {
  const injectedWallet = new ethers.Wallet(wallet.privateKey);
  const erc20Mock = await ethers.getContractFactory('ERC20Mock');
  const multicallMock = await ethers.getContractFactory('Multicall');
  const multicall2Mock = await ethers.getContractFactory('Multicall2');

  const multicall = (await multicallMock.deploy()) as Multicall;
  const multicall2 = (await multicall2Mock.deploy()) as Multicall2;

  updateMockAddresses({ multicall: multicall.address, multicall2: multicall2.address });
  console.log(`MULTICALL ${multicall.address}`);
  console.log(`MULTICALL2 ${multicall2.address}`);

  const token1 = (await erc20Mock.deploy('TOKEN1', 'TK1')) as unknown as ERC20Mock;
  const token2 = (await erc20Mock.deploy('TOKEN2', 'TK2')) as unknown as ERC20Mock;

  console.log(`token1 address ${token1.address}`);
  console.log(`token2 address ${token2.address}`);

  const twentyK = utils.parseUnits('20000');

  await token1.mint(injectedWallet.address, twentyK);
  await token2.mint(injectedWallet.address, twentyK);
})();

function updateMockAddresses(params: { multicall: string; multicall2: string }) {
  const mockFile = path.resolve('src', 'constants', 'mock.ts');

  fs.writeFileSync(
    mockFile,
    Buffer.from(
      `
export const MockAddresses = {
  multicall: '${params.multicall}',
  multicall2: '${params.multicall2}',
};
  `.trim() + '\n',
    ),
  );
}
