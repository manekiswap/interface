import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';

import commonConfig from './common';

process.env.NODE_ENV = 'production';
process.env.ROOT_URL = '';

export default (merge as any)(commonConfig, {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
  },
  plugins: [new BundleAnalyzerPlugin(), new webpack.EnvironmentPlugin(['NODE_ENV', 'ROOT_URL'])],
});
