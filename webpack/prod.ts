import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';
import WebpackObfuscator from 'webpack-obfuscator';

import commonConfig from './common';
import { concat } from './utils';

export default (merge as any)(commonConfig, {
  externals: {
    i18next: 'i18next',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-i18next': 'ReactI18next',
  },
  entry: './src/index.tsx',
  output: {
    filename: 'js/[name].[fullhash].min.js',
    path: resolve(__dirname, '../dist'),
    publicPath: './',
  },
  devtool: false,
  plugins: concat(
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new CopyPlugin({
      patterns: [
        // { from: 'public/fonts', to: './public/fonts' },
        { from: 'public/images', to: './public/images' },
        { from: 'public/_redirects', to: '.' },
        { from: 'public/favicon.ico', to: '.' },
        { from: 'public/robot.txt', to: '.' },
        { from: 'public/site.webmanifest', to: './public/site.webmanifest' },
      ],
    }),
    new WebpackObfuscator(
      {
        rotateStringArray: true,
      },
      ['service-worker.js'],
    ),
  ),
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
          sourceMap: false,
        },
        extractComments: true,
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minChunks: 2,
    },
  },
});
