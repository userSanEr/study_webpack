const {resolve} = require ('path')
const htmlWebpackPlugin = require ('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            //处理图片资源 默认处理不了html中的img图片
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                //当图片大小小于8Kb时，会编译成base64位进行处理
                //优点：减少请求数量(减轻服务器压力)
                //缺点: 图片体积会更大(文件请求速度慢)
                options: {
                    limit: 8 * 1024,
                    esModule: false,  //用来关闭es6的解析模块 在之前版本中默认是按照es6来解析模块 所以这里关闭
                    //[hash:10]取生成图片名的前10位 [ext]取生成图片的后缀名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                //处理html文件的img图片(负责引入img，从而可以被url-loader处理) 
                loader: 'html-loader'
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