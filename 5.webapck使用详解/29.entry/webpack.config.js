const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * entry: 入口起点
 * 1.string ----> './src/index.js'
 *   单入口
 *   打包形成一个chunk 输出一个bundle文件
 *   此时chunk的名称默认叫main
 * 2.array -----> ['./src/index.js', './src/add.js']
 *   多入口
 *   所有入口文件只会形成一个chunk，输出出去只有一个bundle文件
 *   最后还是会将数组的所有的入口打包到数组第一项里面
 *   ---> 只有在开发环境下 HMR功能中让html热更新生效
 *   eg:['react', 'react-dom', 'redux']等打包成一个包
 * 3.object
 *   多入口
 *   有几个入口文件就有几个chunk，同时输出出去就有几个bundle
 *   此时chunk的名称就是对象中key的值
 * 
 * -----> 特殊用法 类似于数组、对象、字符串综合用法
 * {
 *  //在这里会将两个路径打包到index中
 *  index: ['./src/index.js','./src/count.js'],
 *  //会将add单独打包
 *  add:  './src/add.js'
 * }
 * 
 */

module.exports = {
    entry: {
        index: ['./src/index.js','./src/count.js'],
        add:  './src/add.js'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}