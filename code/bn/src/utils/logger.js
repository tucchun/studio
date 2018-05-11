// function print (type) {
//   console.log('///////////////////')
//   console[type](...arguments)
//   console.log('///////////////////')
// }

// const print = (type) => () => {
//   console.log('///////////////////')
//   let log = console.log
//   switch (type) {
//     case 'log':
//       log = console.log
//       break
//     case 'error':
//       log = console.error
//       break
//   }
//   log(...arguments)
//   console.log('///////////////////')
// }

const print = function (type) {
  return function () {
    console.log('///////////////////')
    let log = console.log
    switch (type) {
      case 'log':
        log = console.log
        break
      case 'error':
        log = console.error
        break
    }
    log(...arguments)
    console.log('///////////////////')
  }
}
let logger = print('log')
let error = print('error')

export { logger }
export { error }
