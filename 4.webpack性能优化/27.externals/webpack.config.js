const {resolve} = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'production',
    /**
     * externals
     * 将一些包在打包时排除出去，然后在模板html中使用script将cdn链接引进来
     * 为什么使用cdn引入的话，打包速度就会变快呢
     * 因为我们使用的是线上的资源，进而不会影响打包速度
     * 
     * 注意：需要在html中使用script引入
     * 
     */
    externals: {
        //忽略库名， ---npm对应包名
        jquery: 'jQuery'
    }
}