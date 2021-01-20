const { resolve } =  require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            /**
             * 语法检查:eslint-loader eslint
             * 注意：只检查自己写的代码，第三方库是不检查的
             * 设置检查规则：
             *  在package.json的eslintConfig中设置~
             *  推荐使用：airbnb 是一种js的语法格式
             *  要实现该格式需要下载包：
             *  eslint-config-airbnb 该包是包含react代码在内的语法格式，但是我们当前并不需要
             *  eslint-config-airbnb-base 这个是不包含react代码 但是它还需要同时下载eslint and eslint-plugin-import
             *  这个包包含两个部分 分别是es6以及以上 和es5以及以下
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options:{
                    //自动修复
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}