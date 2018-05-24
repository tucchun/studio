# webpack

我们使用webpack主要完成以下功能：
1. 编译js代码
2. 提取，分割js代码
3. 编译sass代码
4. 压缩js代码
5. 压缩css代码
6. 生成页面
7. 调试
8. 其他

## webpack配制
webapck配制中最主要的是4个部分：
* entry
* output
* loaders
* plugins

### Entry
entry定义了整个构建的起始点。
``` js
webpackConfig.entry = {
  normalize: [ paths.client('normalize') ],
  vendor : config.compiler_vendor,
  app: paths.client('main.js')
}
```
这里定义了3个起始点，key就是这个chunk的名字，后面的是这个chunk的起始点

### Output
output定义了如何输出webpack的打包结果
``` js
webpackConfig.output = {
  filename: `[name].[hash].js`,
  chunkFilename: `[id].[name].[hash].js`,
  path: 'dist',
  publicPath: 'http://one.jushenghua.com/'
}
```
filename: 每个entrypoint对应一个输出文件
chunkFilename: 代码分割后的文件名称
publicPath: 指定所有资源的发布路径

### loaders
loader可以认为是编译器，我们把es6编译成es5，通过babel-loader，把sass编译成css，通过sass-loader
所有的loaders配制定义在
``` js
// webpack1
module.loaders = [
  // loaders
  {
    test: /\.coffee$/,
    loader: 'coffee'
  },
  {
    test: /\.css$/
    loaders: [
      'style',
      'css'
    ]
  }
]

// webpack 2+
module.rules = [
  // loaders
  {
    test: /\.coffee$/,
    loader: 'coffee-loader'
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      }
    ]
  }
]
```

### plugins
plugins是webpack完成其他功能的机制，比如生成页面，使用html-webpack-plugin，压缩js使用UglifyJsPlugin

## 编译JS
### 编译es6
``` js
webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'stage-0']
  }
}]
```
#### preset
a preset is a set of plugins used to support particular language features

### 编译jsx
增加react, flow preset
``` js
webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0', 'flow']
  }
}]
```

### 增加antd的动态加载
增加import plugin
``` js
webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    plugins: ['transform-runtime', ['import', { libraryName: 'antd', style: true }]],
    presets: ['es2015', 'react', 'stage-0']
  }
}]
```

### 编译riot
使用```es2015-riot```preset

### 编译preact
增加以下plugin:
``` js
['transform-react-jsx', { 'pragma': 'h' }]
```

## 提取JS代码
通常情况下，每个entry point包含的模块，都会打包到相应的输出文件中。但有时不同的entry point会包含相同的模块，如果我们把相同的模块提取出来，能够减小整个的输出大小，CommonsChunkPlugin就是为了完成这个的

``` js
webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    names: ['normalize', 'vendor']
  })
)
```

## 代码分割
我们开发的是单页应用，默认，每一个页面都会打包到app.js中，这样就带来一个问题，在打开页面时，要把所有页面的代码加载完以后才能显示。所以这就需要代码分割来加载必须的页面
Webpack本身提供了代码分割功能，webpack1和webpack2+的实现不一样
* webpack1 使用require.ensure(), require()
* webpack2 使用import(), import返回一个Promise
* ensure支持给chunk命名，import不支持

``` js
// webpack 1
require.ensure([], (require) => {
  next(null, [
    require('./Login').default(store),
    require('./dashboard').default(store),
    require('./NotFound').default
  ])
}, 'root')

// webpack 2
render () {
  return (
    <Router history={createHashHistory()}>
      <AsyncRoute path='/counter' getComponent={() => import('./Counter').then(module => module.default)} />
    </Router>
  )
}
```

## 编译SASS
编译sass比较简单，和babel一样，调用sass-loader即可。sass loader的作用就是把sass编译成css，但webpack打包css，还需要一些配制工作
``` js
{
  loader: 'sass-loader',
  options: {
    sourceMap: false,
    includePaths: [paths.client('assets/style')]
  }
}
```

## 打包css
打包css，需要几个loader
* style-loader: 注入```<style>```标签
* css-loader: 解析css中的```@import```和```url()```, 加载设置在相应的文件的加载配制上，见file-loader和url-loader
* resolve-url-loader: 解析```url()```的相对路径
* postcss-loader: 转换css。主要功能是由postcss的plugin提供

``` css
.checked {
  background: url('assets/img/FixedPurchase/check_box_checked_2x.png') no-repeat;
  background-size: 100% auto;
}
```
TO
``` css
.checked {
  background:url(data:image/png;base64,iVBORw0KGgoAA...) no-repeat;
  background-size: 100% auto;
}
```


``` javascript
{
  test: /\.scss$/,
  // webpack 1
  // exclude: excludeCSSModules,
  // loaders: [
  //   'style',
  //   'css',
  //   'resolve-url-loader',
  //   'postcss',
  //   'sass?sourceMap'
  // ]
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: useSouseMap,
        minimize: minimize
      }
    },
    {
      loader: 'resolve-url-loader'
    },
    {
      loader: 'postcss-loader',
      options: postcssLoaderOptions
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: useSouseMap
      }
    }
  ])
}
```

postcss配制，使用了cssnano插件，这个插件用来优化css代码
``` js
const postcssLoaderOptions = {
  plugins: function () {
    return [
      cssnano({
        autoprefixer: {
          add: true,
          remove: true,
          browsers: ['ie >= 8', 'firefox >= 15']
        },
        discardComments: {
          removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: useSouseMap
      }),
      flexfixes()
    ]
  }
}
```
这样，我们就有了可用的css了。这些样式会在页面中生成```<style>```标签。但是，没有CSS文件生成！

## 压缩JS
使用UglifyJSPlugin
``` js
webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    sourceMap: false,
    compress: {
      unsafe_comps: true,
      properties: true,
      keep_fargs: false,
      pure_getters: true,
      collapse_vars: true,
      unsafe: true,
      warnings: false,
      screw_ie8: true,
      sequences: true,
      dead_code: true,
      drop_debugger: true,
      comparisons: true,
      conditionals: true,
      evaluate: true,
      booleans: true,
      loops: true,
      unused: true,
      hoist_funs: true,
      if_return: true,
      join_vars: true,
      cascade: true,
      drop_console: true // remove console.*
    }
  })
)
```

## 压缩CSS
给css-loader加上minimize=true
``` js
{
  loader: 'css-loader',
  options: {
    sourceMap: false,
    minimize: true
  }
}
```

## 加载其他资源，图片，字体
加载其他资源主要使用2个loader：
* file-loader: 当我们```import img from './a.jsp'```是，调用的就是file-loader，返回该文件的url
* url-loader: 和file-loader一样，但返回base64 data当文件大小小于某个值时

``` js
// Images
// ------------------------------------
config.module.rules.push({
  test    : /\.(png|jpg|gif)$/,
  loader  : 'url-loader',
  options : {
    limit : 8192,
  },
})

// Fonts
// ------------------------------------
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]

  config.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype,
    },
  })
})
```

## 生成CSS文件
生成css文件，使用extract-text-webpack-plugin
使用该plugin分2步，一个是插入到plugins的配制数组里；另外一个是使用```extract```方法返回的loader列表替换原来的loader列表。
``` js
// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: false,
})

config.module.rules.push({
  test: /\.(sass|scss)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: useSouseMap,
          minimize: minimize
        }
      },
      {
        loader: 'resolve-url-loader'
      },
      {
        loader: 'postcss-loader',
        options: postcssLoaderOptions
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: useSouseMap
        }
      }
    ]
  })
})
```

## 生成HTML
至此，所有的资源都准备就绪了，就差生成HTML了。
我们使用html-webpack-plugin来生成最终的页面。HtmlWebpackPlugin会把这个页面用到的所有js, css等生成相应的```<style>```, ```<script>```标签插入到相应的html模版里。
``` js
webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    filename: 'index.html',
    inject: 'body',
    publicPath : config.compiler_public_path,
    minify: {
      collapseWhitespace: true
    }
  })
]
```

## 其他
### 导入外部变量
当我们已经在页面里加载了jquery，那么$就已经加载在页面了。如果我们要在代码里引用$，我们要告诉webpack怎么解析$，externals的作用就是这个。
``` js
webpackConfig.externals = {
  'jquery': 'jQuery',
  'moment': 'moment',
  'weui': 'weui'
}
```
