console.log('index.js文件被加载了~')


/**
 * 懒加载~ 就是需要这个模块的时候才去加载
 * 预加载~ 提前将该模块加载了，但是并没有执行，在执行的时候直接取缓存里的
 * 正常加载可以认为是并行加载(同一时间加载多个文件)
 * 预加载prefetch 等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
 * 但是预加载的兼容性非常差，只能在一些高版本的浏览器中才可以使用
 */
document.getElementsByTagName('button')[0].onclick = function(){
  
  import (/*webpackChunkName: 'test', webpackPrefetch: true*/'./test').then(({mul}) => {
    console.log(mul(4,5))
  })
}
