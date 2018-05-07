function* hello() {
  yield 'hello'
  yield 'world'
  return 'ending'
}

var hw = hello()
const log = function(){
  console.log(...arguments)
}

console.log(hw.next())

console.log(hw.next())

console.log(hw.next())

console.log(hw.next())

function* f() {
  for (var i = 0; true; i++) {
    var reset = yield i
    if (reset) { i = -1 }
  }
}

var g = f()
log(g.next())
log(g.next())
log(g.next())
log(g.next(true))

function* foo(x){
  var y = 2 * (yield (x + 1))
  var z = yield (y / 3)
  return (x + y + z)
}


