const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/assets'),
                    to: path.resolve(__dirname, './dist/assets'),
                    noErrorOnMissing: true,
                }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                type: 'asset/resource',
            }
        ]
    }
}