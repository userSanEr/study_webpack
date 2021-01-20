const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//提取css成单独文件
const miniCssExtractPlugin = require('mini-css-extract-plugin')

//设置node.js的环境变量
// process.env.NODE_ENV = 'production'

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
                    /**
                     * css的兼容性处理：postcss
                     * 在webpack中使用 postcss-loader  
                     * 插件 postcss-preset-env
                     * postcss-preset-env 帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
                     * 因为我们现在要修改postcss，所以我们使用loader的形式， 修改默认配置要加上options这个属性
                     */
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
        new miniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development'
}

