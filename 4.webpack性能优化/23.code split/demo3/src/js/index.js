


function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}


/**
 * 通过js代码，让某个文件单独被打包成一个chunk
 * import动态导入语法：能将某个文件单独打包
 * webpackChunkName: 'test' 这个注释的方法是将我们单独打包的一个文件名设置成我们想要的名字
 */
import(/* webpackChunkName: 'test' */ './test')
  .then(({mul, count}) => {
    // eslint-disable-next-line
    console.log(mul(2,5))
  })
  .catch(() => {
    console.log('文件加载失败~')
  })



// eslint-disable-next-line
console.log(sum(1, 2, 3, 4,5));
