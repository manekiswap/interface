import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import commonConfig from './common';

export default (merge as any)(commonConfig, {
  entry: './src/index.tsx',
  devServer: {
    hot: 'only',
    host: '0.0.0.0',
    allowedHosts: 'all',
    port: 8090,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  output: {
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
});
