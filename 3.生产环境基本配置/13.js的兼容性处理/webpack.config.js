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
             * js兼容性处理用babel-loader 
             * 1.只能转换基本语法，如promise等高级语法不能转换
             *      会将es6语法转换成es5或者es5以下的语法
             *      @babel/preset-env @babel/core babel核心库
             * 2.全部的兼容处理
             * @babel/polyfill 
             * 问题：我只要解决部分的兼容性问题，但是将所有的兼容代码全部引入，体积太大
             * 3.需要做兼容性处理就做：按需加载：core-js
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    //预设：指示babel做怎么样的兼容处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                //按需加载
                                useBuiltIns: 'usage',
                                //指定corejs的版本
                                corejs: {
                                    version: 3
                                },
                                //指定兼容到哪个版本
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
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