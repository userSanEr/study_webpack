const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const terserWebpackPlugin = require('terser-webpack-plugin')

/**
 * optimization只有在生产环境才会有比较大的用处
 * 
 */


module.exports = {
    entry: './src/js/index.js',
    output: {
        //文件名称 (指定名称+目录)
        filename: 'js/[name].js',
        //输出文件目录(将来所有资源输出的公共目录)
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //loader配置
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'production',
    optimization: {
        //提取代码，使他进行单独的打包
        splitChunks: {
            chunk: 'all',  //下面这些都是默认值，一般也不会更改
            /*
            minSize: 30*1024, //分割的chunk最小为30kb
            maxSize: 0, //最大没有限制
            minChunks: 1,  //表示当前被提取的chunk至少被引用一次
            maxAsyncRequest: 5,  //按需加载时并行加载的文件的最大数量
            maxInitialRequests: 3,  //入口js文件最大并行请求数量
            automaticNameDelimiter: '~',  //名称连接符
            name: true,  //可以使用命名规则
            cacheGroups: {  //分割chunk的组
                 //node_modules文件会被打包到vendors组的chunk中。 ----vendors~xxx.js
                 //满足上面的公共规则，如大小要超过30kb，至少被引用一次
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    //优先级
                    priority: -10
                },
                default: {
                    //要提取chunk最少被引用两次
                    minChunks: 2,
                    //优先级
                    priority: -20,
                    //如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
                    reuseExistingChunk: true
                }
            }
            */
        },
        //将当前模块的记录其他模块的hash值单独打包为一个文件
        //在写代码分割的时候一定要使用runtimeChunk，否则会导致缓存失效
        //否则某一个代码的修改会导致引入的文件也跟着重新加载
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimizer: [
            //配置生产环境的压缩方案 js、css
            new terserWebpackPlugin({
                //开启缓存
                cache: true,
                //开启多进程打包
                parallel: true,
                //启用source-map 要是使用的话 必须要写 要不会被压缩
                sourceMap: true
            })

        ]
    }
}