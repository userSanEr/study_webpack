const {resolve} = require ('path')
const htmlWebpackPlugin = require ('html-webpack-plugin')
module.exports={
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',


    //开发服务器devServer 用来自动化(自动编译、自动打开浏览器、自动刷新浏览器)
    //特点：只会在内存中编译打包，不会有任何输出 也就是不会像执行webpack那样将打包输出的文件放到build目录中  等你将当前的执行停止时他会自动在内存中删除刚刚的打包文件
    //启动devServer指令： npx webpack-dev-server
    devServer:{
        contentBase: resolve(__dirname, 'build'),
        //启动gzip压缩
        compress: true,
        port: 3000,
        open: true
    }
}