/**
 * 运行项目指令
 * webpack 会将打包结果输出出去
 * npx webpack-dev-server 只会在内存中编译打包 没有输出
 */

import '../css/index.less';
import '../css/iconfont.css'

function add(x,y){
    return x+y
}
console.log(add(1,2))