const { log } = require('./util')

// function *createInterator () {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// function *createInterator (items) {
//   for (let i = 0; i < items.length; i++) {
//     yield items[i]
//   }
// }

// let iterator = createInterator([1, 2])

// log(iterator.next())
// log(iterator.next())
// log(iterator.next())
// log(iterator.next())

// // function fn () {
// //   yield 1
// // }

// // fn()

// let generator = function *(items) {
//   yield 1
//   yield 2
//   yield 3
// }

// let it = generator([1, 2, 3])
// log(it.next())
// log(it.next())
// log(it.next())

// let o = {
//   iterator: function *(items) {
//     for (let i = 0; i < items.length; i++) {
//       yield items[i];
//     }
//   }
// };


// it = o.iterator([1, 2, 3]);
// log(it.next());
// log(it.next());
// log(it.next());

// o = {
//   *iterator (items) {
//     for(let i = 0; i < items.length; i++){
//       yield i
//     }
//   }
// }

// it = o.iterator([1, 2, 3]);
// log(it.next());
// log(it.next());
// log(it.next());

// let values = [1, 2, 3]
// for (let num of values) {
//   console.log(num)
// }

// it = values[Symbol.iterator]()

// log(it.next())
// log(it.next())
// log(it.next())
// log(it.next())

// let collection = {
//   items: [],
//   *[Symbol.iterator] () {
//     for (let item of this.items) {
//       yield item
//     }
//   }
// }

// collection.items.push(1)
// collection.items.push(2)
// collection.items.push(3)

// for (let x of  collection) {
//   log(x)
// }

let colors = ['red', 'green', 'blue']
let tracking = new Set([1234, 5678, 9012])
let data = new Map()

data.set('title', 'Understanding ECMAScript 6')
data.set('format', 'ebook')


// for (let entry of colors.entries()) {
//   log(entry);
// }

// for (let entry of tracking.entries()) {
//   log(entry)
// }

// for (let entry of data.entries()){
//   log(entry)
// }

// for (let entry of colors.values()) {
//   log(entry)
// }

// for (let entry of tracking.values()) {
//   log(entry)
// }

// for (let entry of data.values()) {
//   log(entry)
// }

// for (let [key, value] of data) {
//   log(key, value)
// }

// let message = 'a 吉 b'
// for (let i = 0; i < message.length; i++) {
//   log(message[i])
// }

// for (let item of message) {
//   log(item)
// }
// let arr = [...data]
// log(arr)

// function *createIterator () {
//   let first = yield 1;
//   let second = yield first + 2;
//   yield second + 3;
// }

// function* createIterator () {
//   let first = yield 1;
//   let second;
//   try {
//     second = yield first + 2;
//   } catch (error) {
//     second = 6
//   }
//   yield second + 3;
// }

// let iterator = createIterator()

// log(iterator.next())
// log(iterator.next(4))
// log(iterator.throw(new Error('Boom')))
// log(iterator.next())

// function *createIterator () {
//   yield 1;
//   return 42;
//   yield 2;
//   yield 3;
// }

// let it = createIterator()

// log(it.next())
// log(it.next())
// log(it.next())

// function *createNumberIterator () {
//   yield 1;
//   yield 2;
// }

// function *createColorIterator () {
//   yield 'red'
//   yield 'green'
// }

// function *createCombinedIterator () {
//   yield *createNumberIterator()
//   yield *createColorIterator()
//   yield true
// }

// let iterator = createCombinedIterator()

// log(iterator.next())
// log(iterator.next())
// log(iterator.next())
// log(iterator.next())
// log(iterator.next())
// log(iterator.next())

// function *createNumberIterator () {
//   yield 1;
//   yield 2;
//   return 3;
// }

// function *createRepeatingIterator (count) {
//   for (let i = 0; i < count; i++) {
//     yield 'repeat'
//   }
// }

// function *createCombinedIterator () {
//   let result = yield *createNumberIterator();
//   yield result;
//   log('result', result)
//   yield *createRepeatingIterator(result)
// }

// let iterator = createCombinedIterator()

// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());

/**
 * 
 * @param {Function} taskDef 生成器函数
 */
function run (taskDef) {
  // 创建一个无使用限制的迭代器
  let task = taskDef()

  // 开始执行任务
  let result = task.next()

  // 循环调用next() 函数
  function step () {
    
    // 如果任务未完成，则继续执行
    if (!result.done) {
      result = task.next(result.value)
      step()
    }
  }

  // 开始迭代执行
  step()
}

run(function *(){
  let value = yield 1;
  log(value)
  value = yield value + 3;
  log(value)
})


/**
 * 
 * @param {Function} taskDef 生成器函数
 */
function run (taskDef) {
  // 创建一个无使用限制的迭代器
  let task = taskDef()

  // 开始执行任务
  let result = task.next()

  // 循环调用next() 函数
  function step () {
    
    // 如果任务未完成，则继续执行
    if (!result.done) {
      if (typeof result.value === 'function') {
        result.value(function (err, data) {
          if (err) {
            result = task.throw(err)
          }
          result = task.next(data)
          step()
        })
      } else {
        result = task.next(result.value)
        step()
      }
    }
  }

  // 开始迭代执行
  step()
}

function fetchData () {
  return function (next) {
    setTimeout(function () {
      next(null, 'hi')
    }, 50)
  }
}

run(function *(){
  let result = yield fetchData()
  log(result)
  result = yield result + 1
  log(result)
})