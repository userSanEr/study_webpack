

const {resolve} = require('path')
//创建空白的html
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = { 
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',  
        path: resolve(__dirname, 'build')
    },
    plugins: [
        //要进行html输出的模板内容
        new htmlWebpackPlugin({
            template: './src/index.html',
            //进行html压缩
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production'
}