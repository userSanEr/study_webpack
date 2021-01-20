

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
                    {
                        test: /\.less$/,
                        use: ['style-loader','css-loader','less-loader']
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader','css-loader']
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

    devtool: 'inline-source-map'  
    
}