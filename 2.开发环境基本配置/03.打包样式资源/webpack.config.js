/**
 * webpack.config.js webpack的配置文件
 *  作用：指示webpack干哪些活(当你运行webpack指令时，会加载里面的配置)
 *  webpack构建工具是基于nodejs平台运行的~模块化采用commonjs
 */

 //resolve用来拼接绝对路径的方法
 const { resolve } = require('path');

module.exports = {
    //webpack配置
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname node变量 代表当前文件目录的绝对路径 也就是03.打包样式资源
        //这是防止各系统文件符号不出问题
        path: resolve(__dirname, 'build')
    },
    //loader的配置
    module: {
        rules: [
            //详细loader配置  会去遍历所有的文件 看见是这个结尾就会去处理
            //不同文件配置不同的loader来处理
            //每一个对象里面只可以处理一种情况
            {
                //test表示配置哪些文件
                test: /\.css$/,
                //use使用哪些loader进行处理
                use: [
                    //use数组中loader执行顺序是：从右到左、从下到上、依次执行
                    //创建style标签，将js中的样式资源插入，然后添加到header中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    //将less文件编译成css文件 需要下载less-loader、less
                    'less-loader'
                ]
            }
        ]
    },
    //plugins配置
    plugins: [
        //详细插件配置
    ],
    //模式
    mode: 'development' //可以为生产和开发两种 两个值不能同时写

 }