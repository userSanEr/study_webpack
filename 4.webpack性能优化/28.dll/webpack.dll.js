/**
 * 使用dll技术，对某些库(第三方库：jqery、react、vue...)进行单独打包
 * 当使用webpack命令，默认查找webpack.config.js配置文件
 * 我们现在要运行的是：webpack.dll.js文件
 * 修改配置命令：--webpack --config webpack.dll.js
 * 
 * vue和react已经摒弃了dll
 * 
 */

const {resolve} = require('path')

const webpack = require('webpack')

module.exports = {
    //entry和output是用来进行jquery的打包和输出
    entry: {
        //最终打包生成的[name] ----> jqery
        //['jquery'] -----> 要打包的库
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]'  //打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins: [
        //打包生成一个manifest.json  ----> 提供和jquery映射
        new webpack.DllPlugin({
            name: '[name]_[hash]',  //映射库的暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json')  //输出文件路径
        })
    ],
    mode: 'production'
}