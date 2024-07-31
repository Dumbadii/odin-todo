const path = require('path');
const { title } = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        // print: './src/print.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.html',
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: './dist'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|svg|png|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(otf|ttf|eot|woff|woff2)$/i,
                type: 'asset/resource',
            }
        ]
    }
}