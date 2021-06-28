// import fs from 'fs';
// import path from 'path';

// const packageJson = require('../package.json');

// const configs = ['i18next', 'react', 'react-dom', 'react-i18next'];

// function getPattern(packageName: string, version: string) {
//   return {
//     regexr: new RegExp(`\/${packageName}@\\d+(\\.\\d+)+\/`, 'g'),
//     pattern: `/${packageName}@${version}/`,
//   };
// }

// (function () {
//   const htmlPath = path.resolve('public', 'index.html');

//   let content = fs.readFileSync(htmlPath, 'utf8');

//   for (const packageName of configs) {
//     const version = packageJson.dependencies[packageName];
//     const cfg = getPattern(packageName, version);
//     content = content.replace(cfg.regexr, cfg.pattern);
//   }

//   fs.writeFileSync(htmlPath, content, 'utf8');
// })();
