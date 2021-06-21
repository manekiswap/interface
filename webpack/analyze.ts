import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';

import commonConfig from './common';

export default (merge as any)(commonConfig, {
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
  },
  plugins: [new BundleAnalyzerPlugin(), new webpack.EnvironmentPlugin(['NODE_ENV', 'ROOT_URL'])],
});
