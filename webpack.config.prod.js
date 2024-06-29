const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                            importer: globImporter()
                        }
                    }
                }],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CssMinimizerPlugin(),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
});