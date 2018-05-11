# B2C WEIXIN
B2C WEIXINH5代码

## 前置知识
* [ES6](http://es6.ruanyifeng.com/)
* [react](https://reactjs.org/)
* [SASS](http://sass-lang.com/)

## PREACT
使用[preact](https://preactjs.com/)，注意，不是react。
这次精简了页面结构，不再使用redux，也就没有了react-redux-xxx等package。

### preact和react的区别
* preact使用```import { h, Component } from 'preact'```
* preact不支持PureComponent
* preact没有prop-types
* preact没有Children工具类，但有```this.props.children```
* preact4.0以后，增加类ref支持，但不支持string类型的ref

``` js
// 支持function类型的ref
<div ref={(node) => this.formNode = node}>

// 不支持string类型的ref
<div ref=‘formNode’>
```
* preact的render方法增加了两个参数```render(props, state)```，这样可以不用写```this.props```了，但还是推荐使用和react一样的写法，这样方便和react相互migrate

## 目录结构
* assets 资源目录
  * style 样式文件
  * images 图片
* components 页面，组件目录
* routes 路由定义
* static 静态资源，包括外部引用的js
* utils 工具类
* main.js 页面入口
* normalize.js 包含了```Promise```和```Object.assign()```，对应不支持这些功能的浏览器

### 添加route
添加页面现在不再使用route目录，直接在```routes/index.js```里添加页面链接就可以了
``` js
// 在这个数组中定义页面路由
const components = [
  {
    // 父组件必须以/:*?结尾
    path: '/home/:*?',
    component: 'TabBar',
    // childRoute定义子路由
    childRoute: [
      // 子路由必须包含父组件的路径
      { path: '/home/counter', component: 'Counter' },
      { path: '/home/counter2', component: 'Counter2' }
    ]
  },
  { path: '/counter3', component: 'Counter3' }   // 普通路由定义
]
```

### 页面跳转
* 使用```preact-router```的```route```方法，只有一个route方法，对应```push```和```replace```，没有```go(n)```等方法，这些方法要用```window.history```的

``` js
import { route } from 'preact-router'
// react-router's push
route('/home/counter2')

// react-router's replace
route('/home/counter2', true)
```

* 直接使用```window.history```

``` js
history.back()
history.go(-3)
```

### 处理global数据
因为不用redux，现在global数据存放在APP Component中，在引入Route时，通过props传入
``` jsx
<Router history={createHashHistory()}>
  <AsyncRoute path='/counter' getComponent={() => import('./Counter').then(module => module.default)} store={state.store} updateStore={this.updateStore} />
</Router>
```

updateStore是用来更新store的：
``` js
this.props.updateStore({msg: 'hello world'})
```

在组件内就可以使用这个store了：
``` js
render (props) {
  return (
    <div>
      <h1 >{props.store.msg}</h1>
    </div>
  )
}
```

## ajax
ajax使用zepto提供的ajax方法。
在Component中，请使用```this.props.ajax```来触发ajax，不要使用```utils/ajax```模块
``` js
this.props.ajax('interface-name', {name: 'Sam'})
.then(res => {

}).catch(e => {

})
```
ajax方法现在由2部分实现，
* 一部分是在utils/ajax.js中，这部分主要是调用$.ajax方法
* 另一部分是在APP.js中的this.ajax方法，这部分主要是为了拿到ajax的返回，然后把公共的结果放到global store里

## 页面初始化
在页面打开的时候，有一个loading动作，这个动作在main.js中完成
* loading页面，在index.html中的loading元素下实现
* loading的动作，在main.js的```initializePage```函数中实现，这个函数必须返回一个包含初始化数据的Promise对象

## weui
[weui document](https://github.com/Tencent/weui/wiki)
weui是用[less](http://lesscss.org/)写的，但我们一直在用[sass](http://sass-lang.com/)，所以我们把less的weui转成了sass。
样式放在assets/style/mobile/weui中

[weui.js document](https://github.com/Tencent/weui.js/blob/master/docs/README.md)
weui.js我们是通过引入外部资源的方法引入的

> 我们倾向于直接修改weui css的代码，而不覆盖原样式

## webpack打包
之前我们使用的是```babel-reset-react```来转换jsx，preact使用```babel-plugin-transform-react-jsx```：
``` js
{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    plugins: [
      'transform-runtime',
      // 使用babel-plugin-transform-react-jsx来转换
      // https://preactjs.com/guide/switching-to-preact
      ['transform-react-jsx', { 'pragma': 'h' }]
    ],
    presets: ['es2015', 'stage-0', 'flow']
  }
}]
```

## 微信授权
https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842

## 微信js-sdk
https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115

## Get started
### 安装依赖
```
> npm install
```
### 开发调试
```
> npm run dev
```
### 编译工程
```
> npm run compile
```

### 调试
安装QQ浏览器，开启跨域模式
http://caibaojian.com/txt/chrome-cross-domain
