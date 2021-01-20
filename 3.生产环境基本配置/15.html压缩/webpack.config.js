const { resolve } =  require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')

/**
 * html5不需要进行兼容处理
 * 所以我们只考虑压缩
 */

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            //压缩html代码
            minify: {
                //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true
            }
        })
    ],
    mode: 'production'
}