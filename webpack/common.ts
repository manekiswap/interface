import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import webpack from 'webpack';
import { InjectManifest } from 'workbox-webpack-plugin';

import { cdnPaths, externals } from './cdn';
import { concat } from './utils';

require('dotenv').config({ path: path.resolve(__dirname, '../env/.env') });

const rootUrl = process.env.ROOT_URL || '';
const environment = process.env.NODE_ENV || 'development';
const appEnvironments = ['NODE_ENV', 'REACT_APP_ACHEMY_KEY', 'REACT_APP_INFURA_KEY', 'ROOT_URL'];

export default {
  mode: environment,
  externals,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            allowTsInNodeModules: true,
            configFile: path.resolve(__dirname, '../tsconfig.json'),
            getCustomTransformers: () => ({
              before: environment === 'deveopment' ? [ReactRefreshTypeScript()] : [],
            }),
          },
        },
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(woff|woff2|eot|ttf)($|\?)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jp?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: concat(
    new HtmlWebpackPlugin({
      template: './public/index.ejs',
      cdnPaths,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new InjectManifest({
      compileSrc: true,
      swSrc: './src/service-worker.ts',
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: `${rootUrl}/public`,
      NODE_ENV: environment,
    }),
    new webpack.EnvironmentPlugin(...appEnvironments),
  ),
  resolve: {
    alias: {
      '@mattjennings/react-modal': path.resolve(__dirname, '../node_modules/@mattjennings/react-modal'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  performance: {
    hints: 'warning',
  },
};
