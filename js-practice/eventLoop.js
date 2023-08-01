/**
 * 验证不同版本event loop的节奏
 */
console.log('outer-1')
setTimeout(() => {
  console.log('a')
  new Promise((resolve) => {
    console.log('b')
    resolve()
  }).then(() => {
    console.log('c')
  })
})

console.log('outer-2')
process.nextTick(() => {
  console.log('next-tick')
})

setTimeout(() => {
  console.log('d')
  new Promise((resolve) => {
    console.log('e')
    resolve()
  }).then(() => {
    console.log('f')
  })
})

// node 18 -> outer-1  outer-2  next-tick  a  b  c  d  e  f
// node 10 -> outer-1  outer-2  next-tick  a  b  d  e  c  f
// 由此可见，新版的node，将每一个setTimeout这种宏任务，都认为是一次独立的event loop
// chrome/safari 最新版同node 18，也就是每一个宏任务，独立进入一次event loop成为主流
