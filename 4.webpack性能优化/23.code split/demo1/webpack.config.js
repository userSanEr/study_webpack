

const {resolve} = require('path')
//创建空白的html
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = { 
    //会以这个路径作为入口文件进行打包
    //单入口的配置方式 单页面应用
    // entry: './src/js/index.js'
    entry: {
        //多入口的配置方式 多个页面
        index: './src/js/index.js',
        test: './src/js/test.js'
    },
    output: {
        //将js输出到这个文件中
        //[name] 就是取文件名 在你打包入口那里叫什么我们就取哪一个
        //[contenthash:10] 由于我们在使用缓存之后，每次文件修改无法检测变化，所以带上hash值
        filename: 'js/[name].[contenthash:10].js',  
        //其余的输出目录都会放在build文件下 如果我们想输出到这个目录下的某个目录下 则再加上outputPath
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
    mode: 'production'
}