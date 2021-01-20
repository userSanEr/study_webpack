/**
 * 开发环境配置
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')
module.exports = { 
    //会以这个路径作为入口文件进行打包
    entry: './src/js/index.js',
    output: {
        //将js输出到这个文件中
        filename: 'js/built.js',
        //其余的输出目录都会放在build文件下 如果我们想输出到这个目录下的某个目录下 则再加上outputPath
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                //处理图片资源
                test: /\.(gif|png|jpg)$/,
                loader: 'file-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs'
                }
            },
            {
                test: /\.html$/,
                //处理html文件的img图片(负责引入img，从而可以被url-loader处理) 
                loader: 'html-loader'
            },
            {
                exclude: /\.(less|css|jpg|png|gif|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    }
}