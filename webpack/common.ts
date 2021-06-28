import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import webpack from 'webpack';
import { InjectManifest } from 'workbox-webpack-plugin';

import { concat } from './utils';
const { dependencies } = require('../package.json');

const publicUrl = (process.env.ROOT_URL || '') + '/public';
const environment = process.env.NODE_ENV || 'development';

export default {
  mode: environment,
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
      cdnPaths:
        environment === 'production'
          ? [
              `https://unpkg.com/react@${dependencies['react']}/umd/react.production.min.js`,
              `https://unpkg.com/react-dom@${dependencies['react-dom']}/umd/react-dom.production.min.js`,
              `https://unpkg.com/i18next@${dependencies['i18next']}/dist/umd/i18next.min.js`,
              `https://unpkg.com/react-i18next@${dependencies['react-i18next']}/react-i18next.min.js`,
            ]
          : [],
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
      PUBLIC_URL: publicUrl,
      NODE_ENV: environment,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'ROOT_URL']),
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
