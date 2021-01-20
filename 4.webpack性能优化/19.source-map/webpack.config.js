

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
    },

    /**
     * source-map
     * 提供源代码到构建后代码的映射 (如果构建后的代码出错了，通过映射可以追踪源代码错误)
     * [inline-|hidden-|eval-][nosource-][cheap-[module-]]source-map
     * 
     * --------------------------------------------------------
     * 隐藏源代码错误都是防止外部可以看到源代码
     * 
     * source-map 外部
     * 错误代码准确信息 源代码的错误位置
     * 
     * inline-source-map  内联 类似于顶部style
     *  1.只生成一个内联
     * 错误代码准确信息 源代码的错误位置
     * 
     * hidden-source-map 外部
     * 不能追踪源代码的错误，只能提示构建后代码的位置
     * 
     * eval-source-map 内联 类似于行内style
     *  1.每一个文件都生成对应的source-map，并且都在eval函数中
     * 错误代码准确信息 源代码的错误位置
     * 
     * nosource-source-map 外部
     * 不能追踪源代码的错误，只能提示构建后代码的位置
     * 
     * cheap-source-map 外部
     * 错误代码准确信息 源代码的错误位置
     * 只能精确到错误的行
     * 
     * cheap-module-source-map 外部
     * 错误代码准确信息 源代码的错误位置
     * module会将loader的source-map加入
     * --------------------------------------------------------
     * 
     * 内联和外部的区别：
     * 1.外部生成的文件内部没有
     * 2.内联构建速度更快
     * 
     * 
     * -------------------------------------------------------
     * 生产环境和开发环境
     * 
     * 开发环境:速度快，调试更友好
     * 速度快(eval>inline>cheap>...)
     *  eval-cheap-source-map
     *  eval-source-map
     * 调试更友好
     *  source-map
     *  cheap-module-source-map
     *  cheap-source-map
     * 
     * vue、react脚手架默认使用的是eval-source-map
     * ----> eval-source-map / eval-cheap-module-source-map
     * 
     * 生产环境：考虑源代码是否需要隐藏 调试要不要更友好
     * 内联会让代码体积非常大，所以在生产环境下不用内联
     * 是否隐藏：
     * nosource-source-map  全部代码都隐藏
     * hidden-source-map  只隐藏源代码 会提示构建后代码错误
     * 调试：
     * source-map  hidden-source-map nosource-source-map cheap-source-map cheap-module-source-map
     * 
     * ---->
     */
    devtool: 'inline-source-map'  
    
}