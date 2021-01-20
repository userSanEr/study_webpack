

const {resolve} = require('path')
//创建空白的html
const htmlWebpackPlugin = require('html-webpack-plugin')
//分离css
const miniCssExtractPlugin = require('mini-css-extract-plugin')
//压缩css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

/**
 * 多进程打包 需要下载 thread-loader 一般用在babel-loader上
 * 但是也可以用在任何一个loader上，你用在哪个上它就对哪个起作用
 */

//定义nodejs变量决定使用哪个环境
process.env.NODE_ENV = 'production'

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
    //会以这个路径作为入口文件进行打包
    entry: ['./src/js/index.js'],
    output: {
        //将js输出到这个文件中
        filename: 'js/built.[contenthash:10].js',  //由于我们在使用缓存之后，每次文件修改无法检测变化，所以带上hash值
        //其余的输出目录都会放在build文件下 如果我们想输出到这个目录下的某个目录下 则再加上outputPath
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //单独拿出来 每个文件都会执行一遍
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
            {
                //让每个文件只会匹配其中一个loader 不需要每一个都去执行一遍
                //注意：不能有两个配置同时处理一个文件，否则它匹配一个之后，之后的就不再匹配
                oneOf: [
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
                    //对js进行兼容处理  
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [
                            /**
                             * 开启多进程打包有利有弊
                             * 进程启动大概为600ms，进程通信也有开销
                             * 只有工作消耗时间比较长，才需要进程打包
                             * 要想体现出来，就得babel多用几次 babel用得多也就是js文件要多 
                             * 如果比较少的话可能得不偿失
                             */
                            {
                                loader: 'thread-loader',
                                options: {
                                    workers: 2  //进程为2个
                                }
                            },
                            {
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
                                    ],
                                    //开启babel缓存 在第二次构建时，才会读取缓存
                                    cacheDirectory: true
                                },
                            }
                        ]
                        
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
            filename: 'css/built.[contenthash:10].css'
        }),
        //进行css压缩
        new optimizeCssAssetsWebpackPlugin()
    ],
    mode: 'production',

    devtool: 'source-map'  
}