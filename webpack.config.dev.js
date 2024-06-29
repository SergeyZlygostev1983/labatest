const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
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
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
});