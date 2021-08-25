import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const abis = [
  'IERC20.sol',
  'IUniswapV2ERC20.sol',
  'IUniswapV2Factory.sol',
  'IUniswapV2Pair.sol',
  'IUniswapV2Router02.sol',
  'IWETH.sol',
];

(function () {
  const contractsPath = path.resolve('..', 'manekiswap-contracts');
  const abisPath = path.resolve(contractsPath, 'src', 'artifacts', 'contracts', 'uniswapv2', 'interfaces');

  execSync(`yarn --cwd ${contractsPath} compile`);
  for (const abi of abis) {
    const dir = path.resolve(abisPath, abi);
    const abis = fs.readdirSync(dir);
    const prodAbis = abis.filter((abi) => abi.indexOf('dbg.json') === -1);
    const prodAbisPaths = prodAbis.map((abi) => {
      return {
        from: path.resolve(dir, abi),
        to: path.resolve('src', 'abis', abi),
      };
    });
    for (const { from, to } of prodAbisPaths) {
      fs.createReadStream(from).pipe(fs.createWriteStream(to));
    }
  }
})();
