//当修改了webpack配置一定要重启webpack服务
/**
 * HMR:hot module replacement 热模块替换/模块热替换
 * 作用：一个模块发生变化，只会重新打包这一个模块(而不是打包所有模块)
 * 极大的提升构建速度
 * 
 * 样式文件：可以实现HMR功能，因为style-loader内部实现了
 *  注意：只能使用style-loader去处理，不能单独将css文件分离出去
 * js文件: 默认不能使用HMR功能 修改js代码，添加支持HMR功能
 *  注意：HMR只能对非入口文件进行处理
 * html文件： 默认不能使用HMR功能，同时会导致问题，html不能热更新 (只有一个模块，所以我们不使用HMR功能)
 * 
 * 解决：
 * 修改entry入口，将html文件引入
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')
module.exports = { 
    //会以这个路径作为入口文件进行打包
    entry: ['./src/js/index.js', './src/index.html'],
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
        open: true,
        //开启HMR功能
        hot: true
    }
}