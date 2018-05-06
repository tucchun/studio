const { log } = require('./util')

function createInterator (items) {
  let i = 0
  return {
    next () {
      let done = ( i >= items.length)
      let value = !done ? items[i++] : undefined
      return {
        done,
        value
      }
    }
  }
}

let iterator = createInterator([1, 2, 3])

log(iterator.next())
log(iterator.next())
log(iterator.next())
log(iterator.next())