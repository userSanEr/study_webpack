#### webpack学习总结
##### 配置浏览器兼容设置
在package.json文件中配置`browserslist`文件
```
"browserslist": {
    "development": [
      "last 1 chrome version",  //兼容当前浏览器最近的一个版本
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.2%",  //使用度大于0.2%
      "not dead",  //不兼容已经死了的浏览器
      "not op_mini all"  //不兼容下面op_mini
    ]
  }
```
在这里配置的默认是看生产环境的

##### 如何在vscode中打开markdown文件的实时预览
使用`fn+f1`打开，然后输入markdown，打开侧边栏预览即可

##### webpack性能优化
* 开发环境性能优化
  * HMR
  * source-map
* 生产环境性能优化
  * tree-shaking
  * oneOf
  * babel缓存
  * hash - chunkhash - contenthash
  * 代码分割 code split
  * 懒加载、预加载
  * externals
  * dll
  * PWA
  * 多进程打包
  * source-map


###### 开发环境性能优化
* 优化打包构建速度
  * HMR


    当只有一个模块发生变化时，我们只会打包这一个模块，而其他模块则使用之前的缓存<br/>
    html 只有一个模板文件 所以我们不需要<br/>
    css 当使用style-loader会默认开启HMR功能<br/>
    js 使用module.hot监听是否开启了这个功能，但是只能对非入口文件进行监听
  ```
  //一旦module.hot为true，说明开启了HMR功能。  让HMR功能生效
  if(module.hot){
      //方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包
      //执行回调函数 
      module.hot.accept('./print.js', function(){
          print()
      })
  }
  ```
* 优化代码调试
  * source-map 源代码到构建后代码的映射
  推荐：eval-source-map 行内 错误代码准确信息 源代码的错误位置

###### 生产环境性能优化
* 优化打包构建速度
  * babel缓存

    我们在单页面项目进行处理时，js是使用最多的，在这里我们会用到eslint-loader和babel-loader来处理js<br/>
    eslint-loader用来检查并修复;
    babel-loader用来检查并转换<br/>
    所以开启babel缓存更加有利于打包构建速度，但是babel缓存只能用于第二次打包构建时，使用缓存
    ```
    cacheDirectory: true
    ```
  
  * 多进程打包

    一般我们默认的打包是单进程的，如果某个任务的代码比较多的话，就会直接停顿在这里，但是当我们开启多进程打包之后，就可以多个进程同时运行<br/>
    优点：能加快打包速度<br/>
    缺点：每个进程的开启以及通信都要耗费时间<br/>
    下载：thread-loader 
    一般用在babel-loader上
    ```
    //对js进行兼容处理  
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
              /**
                * 开启多进程打包有利有弊
                * 进程启动大概为600ms，进程通信也有开销
                * 只有工作消耗时间比较长，才需要进程打包
                * 要想体现出来，就得babel多用几次 babel用得多也就是js文件要多 
                * 如果比较少的话可能得不偿失
                */
              {
                  loader: 'thread-loader',
                  options: {
                      workers: 2  //进程为2个
                  }
              },
              {
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
                      ],
                      //开启babel缓存 在第二次构建时，才会读取缓存
                      cacheDirectory: true
                  },
              }
          ]
      },
    ```

  * 代码分割 code split

    分为单入口和多入口两种模式，一般我们都是单入口文件<br/>
    在我们一般不进行代码分割时，会把所有的文件都打包生成一个js文件，但是这样会导致代码体积比较大，打包缓慢<br/>
    在使用code split之后，就可以使每个js文件分割，然后单独打包，这样所有的js文件就可以并行打包构建<br/>
    下面所说的两种方法是可以并行使用的
    * 第一种

      ```
      optimization: {
          splitChunks: {
              chunks: 'all'
          }
      },
      ```
      可以将node_modules里的文件，单独打包成一个模块，然后最后生成的文件就有两个js模块<br/>
      在使用optimization时会自动分析多入口文件中使用的公共模块(小于十几kb的不会)，然后直接引用，不会重复打包

    * 第二种
      
      可以使用import语法，对指定的js进行分割，这样就会生成一个单独的js文件

      ```
      import(/* webpackChunkName: 'test' */ './test')
      .then(({mul, count}) => {
        // eslint-disable-next-line
        console.log(mul(2,5))
      })
      .catch(() => {
        console.log('文件加载失败~')
      })
      ```
    在上面所说的代码分割之后，我们只是将自己的js文件进行单独的细分，然后使用`optimization`将node_modules进行分开，但是node_modules中涉及的类库也有很多，如果可以分开打包岂不是更好

  * externals
      
      先声明哪个库不用打包，然后再使用script进行引入，这样就避免了这个库的打包
      * 声明：webpack中进行配置
      ```
      externals: {
        //忽略库名， ---npm对应包名
        jquery: 'jQuery'
      }
      ```
      * 在html中使用script标签引入文件
      ```
      <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
      ```

  * dll(与code split一起使用 但是vue和react现在好像已经弃用)

    使用dll可以配置dll.config.js对某个第三方库进行单独的打包，然后在webpack.config.js打包时，将这个库分离出去，最后再使用script引入使用dll单独打包的库，较为麻烦
    * dll.config.js文件配置

      当使用webpack命令，默认查找webpack.config.js配置文件
      我们现在要运行的是：webpack.dll.js文件
      修改配置命令：--webpack --config webpack.dll.js
      ```
      const {resolve} = require('path')

      const webpack = require('webpack')

      module.exports = {
          //entry和output是用来进行jquery的打包和输出
          entry: {
              //最终打包生成的[name] ----> jqery
              //['jquery'] -----> 要打包的库
              jquery: ['jquery']
          },
          output: {
              filename: '[name].js',
              path: resolve(__dirname, 'dll'),
              library: '[name]_[hash]'  //打包的库里面向外暴露出去的内容叫什么名字
          },
          plugins: [
              //打包生成一个manifest.json  ----> 提供和jquery映射
              new webpack.DllPlugin({
                  name: '[name]_[hash]',  //映射库的暴露的内容名称
                  path: resolve(__dirname, 'dll/manifest.json')  //输出文件路径
              })
          ],
          mode: 'production'
      }
      ```
    * webpack.config.js配置

      告诉webpack哪些库不参与打包，同时使用时的名称也得变 不参与打包那我们怎么使用资源
      引入webpack<br/>
      `const webpack = require('webpack')`
      ```
          new webpack.DllReferencePlugin({
              manifest: resolve(__dirname, 'dll/manifest.json')
          }),
      ```
      将某个文件打包输出去，并在html中自动引入该资源<br/>
      需要下载插件：add-asset-html-webpack-plugin

      ```
      new addAssetHtmlWebpackPlugin({
          filepath: resolve(__dirname, 'dll/jquery.js')
      })
      ```

* 优化代码运行的速度
  * oneOf

    我们配置的每一个loader每个文件都会过一遍，虽然不会处理--->耗费性能
    所以我们可以将单独匹配某一个文件的放到oneof这个数组中
    ```
    module:{
      rules: [
        {
          
          test: //
        },
        ..在这里存放与oneOf有重复处理的loader模块
        {
          oneOf: [
            ...在这里存放每一个只需要一个loader的模块
          ]
        }
      ]
    }
    ```
  * hash - chunkhash - contenthash

    为了可以让用户使用运行更快，我们可以使用强制缓存，使得，下次直接从缓存获取内容，然后运行，运行速度较快
    但是如果我们缓存的时间较长，当我们改变代码时，他也不会发生改变，此时我们就需要hash值来标记，当hash值发生变化时，就代表当前的模块发生修改

    三者的区别
    * hash 
      
      webpack每次打包都会生成hash值，也就是不管代码有没有发生变化，hash值肯定会变
      这样会导致，文件内容并没有发生变化，但是文件名变了，就会重新加载
    * chunkhash

      如果打包来自同一个入口，那就同属于同一个chunk，所以就属于同一个hash值，比如css是从js中引入的，当js发生改变时，css也会跟着改变
    * contenthash

      是根据文件内容去生成hash值，文件内容不同，hash值也不同，不管是不是来自同一个入口

  * tree-shaking

    内部自动启动一个插件 类似于丑陋的意思<br/>
    去除应用程序中，没有使用的代码，就是我们的某个组件即使是引入进来了，但是我们只是按需加载了某些我们需要使用的文件，在打包时，其他文件是不会被打包进来的
    从而让代码体积更小，用户体验更好<br/>
    要求：webpack的生产模式
         使用ES6模块<br/>
    还可以在package.json配置
    ```
    "sideEffects": false
    ```
    代表所有的代码都没有副作用，但是可能会导致我们损失css、@babel/polyfill这些文件<br/>
    解决：在这里*代表任意的css、less文件，也就是说css和less文件不会被树摇掉
    ```
    "sideEffects": ["*.css", "*.less"]  
    ```
  
  * 懒加载、预加载(与code split一起使用)

    代码懒加载：在我们使用code split时，如果使用import对js文件进行异步引入，此时就会开启懒加载，等使用到才会加载

    代码预加载：是在其他主要代码加载完之后，再去偷偷的加载，这个是在使用import语法异步加载js时，使用` webpackPrefetch: true`进行配置的，但是一般情况下不用，因为只有一些高版本的浏览器才兼容
    ```
    import (/*webpackChunkName: 'test', webpackPrefetch: true*/'./test').then(({mul}) => {
      console.log(mul(4,5))
    })
    ```
    相对于懒加载和预加载，就加载速度来说，如果文件体积较大，等你在使用的时候再去加载，其实是比较慢的，用户体验比较差。
    就性能来说，其实这个文件，不管你早还是晚，你都是需要加载的，所以相对比来说，还是预加载更可行
  
  * pwa

    下载插件 (workbox-webpack-plugin)
    离线可访问技术，使用seviceworker和cache方法组成，可以使网站即使离线的状态下，也可以访问
    
    在webpack中进行配置开启serviceWorker功能，下载`npm i workbox-webpack-plugin -D`
    ```
    plugins: [
      new workboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]

    ```
    在主入口文件中注册servicerWorker文件 <br/>
    注册serviceWorker 处理兼容问题 需要注意serviceWorker的W首字母大写
    ```
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(() => {
            console.log('sw注册成功了~');
          })
          .catch(() => {
            console.log('sw注册失败了~');
          });
      });
    }
    ```
    注意事项：
    * eslint不认识window、navigator等全局变量，

      解决：需要修改package.json中的eslintConfig配置
      ```
      "env":{
        "browser": true //支持浏览器全局变量
      }
      ```
    * sw必须运行在服务器上

      npm i serve -g 安装服务器插件<br/>
      serve -s build   build指的是我们想要运行代码的目录  启动服务器，将build目录下所有资源作为静态资源暴露出去<br/>
      在这里到项目里启动服务之后 记得使用http的网址
   

* 优化代码调试 

  推荐：source-map  外部 错误代码准确信息 源代码的错误位置 
  因为行内会增加代码体积，所以一般生产环境我们使用外部

###### source-map
提供源代码到构建后代码的映射 (如果构建后的代码出错了，通过映射可以追踪源代码错误) <br/>
开启的source-map的模式可以分为一下几种 <br/>
可以搭配使用各模式：<br/>
inline | eval | hidden <br/>
nosource <br/>
cheap | cheap-module <br/>
source-map <br/>

* (inline | eval) - source-map 都是行内 

  错误代码准确信息 源代码的错误位置
  * inline 类似于head中引入style标签
  * eval 类似于在行内样式中写style标签

* (nosource | hidden) - source-map 

  不能追踪源代码的错误，只能提示构建后代码的位置
  * nosource 全部代码都隐藏
  * hidden 只隐藏源代码 会提示构建后代码错误

* (cheap | cheap-module) - source-map

  错误代码准确信息 源代码的错误位置 但是只能精确到行
  * cheap-module会将loader中的代码错误提示信息也加入

设置方式，在于entry同级设置：`devtool: 'inline-source-map' `

##### 使用eslint
在使用eslint之后我们可以设置fix为true使其在保存之后可以自动的为我们改正格式
但是如果我们的js里面使用console等语句的话，并不会报错，但是会有警告
此时我们用js的注释语法：//eslint-disable-next-line<br/>

配置eslintConfig:
```
"eslintConfig": {
  "extends": "airbnb-base",  //这个代表继承哪个格式
  "env": {
    "browser": true
  }
},
```
在这里使用的是airbnb语法的标准格式，我们需要下载：
`eslint-loader eslint eslint-config-airbnb-base`
接着在webpack中进行配置
```
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options:{
        //自动修复
        fix: true
    }
}
```

##### webpack5与webpack4的区别:
* webpack5默认会直接将entry、output等省略掉<br/>
  只需要配置mode:'development' / mode: 'production'即可

* webpack5的tree sharking功能更加强大，比如我们在引用模块时

  a.js
  ```
  export const name = 'jack'
  export const b = 'saner'
  ```
  b.js
  ```
  import * as a from './a.js'
  ```
  c.js
  ```
  import * as b from './b.js'
  console.log(b.a.name)
  ```
此时webpack5会直接将b变量省略打包，而4并不会识别出来

