// import '@babel/polyfill'

const add = (x,y) =>{
  return x+y
}

console.log(add(2,3))

const promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('setTimeout')
    resolve()
  },1000)
})

console.log(promise)