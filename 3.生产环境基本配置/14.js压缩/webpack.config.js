const { resolve } =  require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    //在生产环境下会自动进行js压缩
    mode: 'production'
}