const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//提取css成单独文件
const miniCssExtractPlugin = require('mini-css-extract-plugin')

//压缩css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//设置node.js的环境变量
// process.env.NODE_ENV = 'production'

//optimize-css-assets-webpack-plugin  进行css的压缩

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',  创建style标签，将样式放入，在页面通过style标签引入css样式
                    miniCssExtractPlugin.loader,  //取代js中的css 将css生成由外部单独引入的文件
                    'css-loader',
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //进行分离css
        new miniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename: 'css/built.css'
        }),
        //进行压缩css
        new optimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}

