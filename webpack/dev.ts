import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import commonConfig from './common';
import { concat } from './utils';

export default (merge as any)(commonConfig, {
  entry: './src/index.tsx',
  devServer: {
    hot: true,
    host: '127.0.0.1',
    port: 8090,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  plugins: concat(new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()),
});
