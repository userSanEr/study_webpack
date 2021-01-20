const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * webpack的对象属性顺序是没有限制的
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
    //解析模块的规则
    resolve: {
        /**
         * 配置解析路径别名:
         * 优点:简写路径
         * 缺点：写路径没有提示
         */
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        //配置省略文件路径的后缀名
        //会先为没有后缀名的文件一次补充 js、json、css等后缀名 按照配置顺序一次匹配
        //如果都没有就会报错
        extensions: ['.js', '.json', '.css'],
        //告诉webpack解析是去找哪个目录
        //如果我们前面没有使用../指定路径，他就会一层一层的去查找，直到找到这个node_modules
        //但是当我们指定目录之后，就会直接查找，比较快捷
        //这个数组里配置的每一项都是去查找，如果我们第一项的路径没有起作用会自动匹配第二项
        modules: [resolve(__dirname, '../node_modules'), 'node_modules']
    },
    mode: 'development'
}