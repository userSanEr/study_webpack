const {resolve} = require('path')
//创建空白的html
const htmlWebpackPlugin = require('html-webpack-plugin')
//分离css
const miniCssExtractPlugin = require('mini-css-extract-plugin')
//压缩css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//定义nodejs变量决定使用哪个环境
process.env.NODE_ENV = 'production'

/**
 * 将css与less公共的处理loader提取出来
 * 然后在下方可以直接使用...进行扩展使用
 * miniCssExtractPlugin.loader 该loader取代style-loader 单独为css建立单独的文件夹进行分离css
 * postcss-loader 用来处理css的兼容问题，需要在package.json中配置browserslist，设置css需要兼容的浏览器版本
 * 
 */
const commonCssLoder = [
    {
        loader: miniCssExtractPlugin.loader,  // 'style-loader',  创建style标签，将样式放入，在页面通过style标签引入css样式 取代js中的css 将css生成由外部单独引入的文件
        options: {
            publicPath: '../'   //在这里设置options是因为在css分离之后，图片的引用路径等发生变化
        }
    },
    'css-loader',
    'postcss-loader'
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //处理css文件
            {
                test: /\.css$/,
                use: [
                    ...commonCssLoder
                ]
            },
            //处理less文件
            {
                test: /\.less$/,
                use: [
                    ...commonCssLoder,
                    'less-loader'
                ]
            },
            /**
             * 正常来讲一个文件只能被一个loder处理
             * 当一个文件要被多个loader处理，一定要注意loder的处理顺序
             * 先进性eslint 再进行js兼容
             */
            //处理js语法检查 使用的是airbnb-base这种语法检查 在package.json中进行eslintConfig
            {
                test: /\.js$/,
                exclude: /node_modules/,
                //优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true  //自动处理
                }
            },
            //对js进行兼容处理  
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '50'
                                }
                            }
                        ]
                    ]
                }
            },
            //处理css中的图片
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    limit: 8*1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs',
                    esModule: false
                }
            },
            //专门处理html中的图片
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            //其他文件的处理
            {
                exclude: /\.(js|css|html|jpg|less|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'  //注意这里path要大写
                }
            }
        ]
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
        }),
        //进行css分离
        new miniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        //进行css压缩
        new optimizeCssAssetsWebpackPlugin()
    ],
    //自动进行js压缩
    mode: 'production'
}