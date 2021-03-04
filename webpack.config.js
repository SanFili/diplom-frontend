const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[chunkhash].${ext}`;

module.exports = {
    entry: {
      index: "./src/index.js",
      news: "./src/news.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename("js"),
        sourceMapFilename: "[name].js.map"
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.js$/,
            use: { loader: "babel-loader" },
            exclude: /node_modules/
            },
            {
            test: /\.css$/,
            use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            'css-loader',
            'postcss-loader']
            },
            {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: "image-webpack-loader",
                options: {
                  name: "[path][chunkhash].[ext]",
                  bypassOnDebug: true,
                  disable: false,
                }
            }
            ],
            },
            {
              test: /\.(svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
              use: [
                {
                  loader: "file-loader",
                  options: {
                      esModule: false,
                      outputPath: "./images"
                  },
                },
              ],
            },
            {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  outputPath: "./vendor/fonts/",
                  esModule: false,
                },
              },
            ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: `${filename("css")}`
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html',
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/news.html',
            filename: 'news.html',
            chunks: ["news"]
      }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer: {
      open: true,
      openPage: '', // <== Add this
    },
}