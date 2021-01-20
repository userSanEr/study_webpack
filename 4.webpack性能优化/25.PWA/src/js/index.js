import '../css/index.css';
import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(mul(2,2))

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4,5));

/**
 * 1.eslint不认识window、navigator等全局变量
 * 解决：需要修改package.json中的eslintConfig配置
 * "env":{
 *    "browser": true //支持浏览器全局变量
 * }
 * 2.sw必须运行在服务器上
 * ---> nodejs
 * ---> npm i serve -g
 *      serve -s build   build指的是我们想要运行代码的目录  启动服务器，将build目录下所有资源作为静态资源暴露出去
 *
 * 在这里到项目里启动服务之后 记得使用http的网址
 */
// 注册serveriveworker 处理兼容问题 需要注意serviceWorker的W首字母大写
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
