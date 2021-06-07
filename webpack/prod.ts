import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';

import commonConfig from './common';

export default (merge as any)(commonConfig, {
  externals: {
    i18next: 'i18next',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  entry: './src/index.tsx',
  output: {
    filename: 'js/[name].[fullhash].min.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'ROOT_URL']),
    new CompressionPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public/fonts', to: './public/fonts' },
        { from: 'public/images', to: './public/images' },
        { from: 'public/_redirects', to: '.' },
        { from: 'public/favicon.ico', to: '.' },
        { from: 'public/robot.txt', to: '.' },
        { from: 'public/site.webmanifest', to: './public/site.webmanifest' },
      ],
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
          sourceMap: true,
        },
        extractComments: true,
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20480,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
});
