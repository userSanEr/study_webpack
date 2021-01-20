

import '../css/index.less';
import '../css/iconfont.css'
import Print from './print'

Print();
function add(x,y){
    return x+y
}
console.log(add(1,2))

//一旦module.hot为true，说明开启了HMR功能。  让HMR功能生效
if(module.hot){
    //方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包
    //执行回调函数 
    module.hot.accept('./print.js', function(){
        print()
    })
}