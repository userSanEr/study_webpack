import '../css/a.css';
import '../css/b.css';
import '../css/iconfont.css';
import '../css/index.less';

const add = (x, y) => x + y;

console.log(add(2, 3));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('setTimeout');
    resolve();
  }, 1000);
});

console.log(promise);
