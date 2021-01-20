const {resolve} = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        //告诉webpack哪些库不参与打包，同时使用时的名称也得变 不参与打包那我们怎么使用资源
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        //将某个文件打包输出去，并在html中自动引入该资源
        new addAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],
    mode: 'production'
}