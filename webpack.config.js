const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(path.resolve(__dirname, 'client'))

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            './client/index.html',
            './client/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loaders: ['html-loader'],
                include: [
                    path.resolve(__dirname, 'client')
                ]
            },
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, 'client')
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8000,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './client/index.html'
        })
    ]
}