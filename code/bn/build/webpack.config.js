import webpack from 'webpack'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'
import _debug from 'debug'
import path from 'path'

const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const { __DEV__, __TEST__, __RUN_IN_DEV__, __RUN_IN_UAT__, __RUN_IN_PRD__ } = config.globals

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const minimize = __RUN_IN_UAT__ || __RUN_IN_PRD__
const useSouseMap = !minimize

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  // devtool: config.compiler_devtool,
  resolve: {
    // root: paths.client(),  // webpack 1
    modules: [
      paths.client(),
      'node_modules',
      path.join(__dirname, '../node_modules')
    ],
    // extensions: ['', '.js', '.jsx', '.json']  // webpack 1
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      'lib': resolve('node_modules')
    }
  },
  module: {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
webpackConfig.entry = {
  normalize: [ paths.client('normalize') ],
  vendor : config.compiler_vendor,
  // app: __DEV__ ? [ paths.client('app.js'), `webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr` ] : paths.client('app.js'),
  main: __DEV__ ? [ paths.client('main.js'), `webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr` ] : paths.client('main.js')
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  chunkFilename: `[id].[name].[${config.compiler_hash_type}].js`, // must have, or the chunkName in require.ensure() will not work
  path: paths.dist(),
  publicPath: config.compiler_public_path
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('index.template.html'),
    hash: false,
    filename: 'index.html',
    inject: 'body',
    chunks: ['normalize', 'vendor', 'main'],
    publicPath : config.compiler_public_path,
    umengkey: config.umengkey,
    minify: {
      collapseWhitespace: true
    }
  }),
  new CopyWebpackPlugin([
    { from: paths.client('static'), to: paths.dist() }
  ])
]

webpackConfig.externals = {
  // '$': '$',
  'CryptoJS': 'CryptoJS',
  // 'weui': 'weui'
}

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else if (minimize) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    // new webpack.optimize.OccurrenceOrderPlugin(), // webpack 2 use this by default
    // new webpack.optimize.DedupePlugin(),  // webpack 2 removed this plugin
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
        drop_console: __RUN_IN_PRD__ // remove console.*
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['normalize', 'vendor']//, 'manifest']
    })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
// eslint-loader
if (__DEV__) {
  webpackConfig.module.rules = [{
    test: /\.(js|jsx)$/,
    loader: 'eslint-loader',
    enfoce: 'pre',
    exclude: /node_modules/,
    options: {
      formatter: require('eslint-friendly-formatter'),
      emitWarning: true
    }
  }]
}

// JavaScript / JSON
webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  // options: {
  //   cacheDirectory: true,
  //   plugins: [
  //     'transform-runtime'
  //   ],
  //   presets: ['es2015', 'react', 'stage-0']
  // }
}]
// webpack 1, webpack 2 needn't this
// {
//   test: /\.json$/,
//   loader: 'json'
// }]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
// const BASE_CSS_LOADER = 'css?sourceMap&-minimize'  // webpack 1
const BASE_CSS_LOADER = {
  loader: 'css-loader',
  options: {
    sourceMap: useSouseMap,
    minimize: minimize
  }
}

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'react-toolbox', (example)
]

// If config has CSS modules enabled, treat this project's styles as CSS modules.
if (config.compiler_css_modules) {
  PATHS_TO_TREAT_AS_CSS_MODULES.push(
    paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&')
  )
}

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`)

const sassLoaderOptions = {
  includePaths: [paths.client('assets/style')]
}

const postcssLoaderOptions = {
  plugins: function () {
    return [
      cssnano({
        autoprefixer: {
          add: true,
          remove: true,
          browsers: ['ie >= 8', 'firefox >= 15', 'iOS 7']
        },
        discardComments: {
          removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: useSouseMap
      })
    ]
  }
}

// Loaders for files that should not be treated as CSS modules.
// const excludeCSSModules = isUsingCSSModules ? {exclude: cssModulesRegex} : false   // webpack 1
const excludeCSSModules = isUsingCSSModules ? {exclude: cssModulesRegex} : {}
webpackConfig.module.rules.push({
  test: /\.scss$/,
  use: [
    { loader: 'style-loader' },
    BASE_CSS_LOADER,
    {
      loader: 'resolve-url-loader'
    },
    {
      loader: 'postcss-loader',
      options: postcssLoaderOptions
    },
    {
      loader: 'sass-loader',
      options: Object.assign({
        sourceMap: useSouseMap
      }, sassLoaderOptions)
    }
  ],
  include: /node_modules/
})
webpackConfig.module.rules.push({
  test: /\.scss$/,
  use: [
    { loader: 'style-loader' },
    {
      ...BASE_CSS_LOADER,
      options: {
        ...BASE_CSS_LOADER.options,
        modules: true,
        localIdentName: '[local]-[hash:base64:8]'
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
      options: Object.assign({
        sourceMap: useSouseMap
      }, sassLoaderOptions)
    }
  ],
  exclude: /node_modules/
})
// webpackConfig.module.rules.push(Object.assign({
//   test: /\.scss$/,
//   use: [
//     {
//       loader: 'style-loader'
//     }
//   ].concat([
//     {
//       ...BASE_CSS_LOADER,
//       options: {
//         ...BASE_CSS_LOADER.options,
//         modules: true,
//         localIdentName: '[path][name]-- - [local]-- - [hash: base64: 5]'
//       }
//     }
//   ]).concat([
//     {
//       loader: 'resolve-url-loader'
//     },
//     {
//       loader: 'postcss-loader',
//       options: postcssLoaderOptions
//     },
//     {
//       loader: 'sass-loader',
//       options: Object.assign({
//         sourceMap: useSouseMap
//       }, sassLoaderOptions)
//     }
//   ])
// }, excludeCSSModules))

webpackConfig.module.rules.push(Object.assign({
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
    }
  ].concat([
    BASE_CSS_LOADER
  ]).concat([
    {
      loader: 'postcss-loader',
      options: postcssLoaderOptions
    }
  ])
}, excludeCSSModules))

webpackConfig.module.rules.push(Object.assign({
  test: /\.less$/,
  use: [
    {
      loader: 'style-loader'
    }
  ].concat([
    BASE_CSS_LOADER
  ]).concat([
    {
      loader: 'postcss-loader',
      options: postcssLoaderOptions
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: useSouseMap
      }
    }
  ])
}, excludeCSSModules))

// ------------------------------------
// Style Configuration
// ------------------------------------

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
  {
    test: /\.woff(\?.*)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        prefix: 'fonts/',
        name: '[path][name].[ext]',
        limit: 10000,
        mimetype: 'application/font-woff'
      }
    }]
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        prefix: 'fonts/',
        name: '[path][name].[ext]',
        limit: 10000,
        mimetype: 'application/font-woff2'
      }
    }]
  },
  {
    test: /\.otf(\?.*)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        prefix: 'fonts/',
        name: '[path][name].[ext]',
        limit: 10000,
        mimetype: 'font/opentype'
      }
    }]
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        prefix: 'fonts/',
        name: '[path][name].[ext]',
        limit: 10000,
        mimetype: 'application/octet-stream'
      }
    }]
  },
  {
    test: /\.eot(\?.*)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        prefix: 'fonts/',
        name: '[path][name].[ext]'
      }
    }]
  },
  {
    test: /\.svg(\?.*)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        prefix: 'fonts/',
        name: '[path][name].[ext]',
        limit: 10000,
        mimetype: 'image/svg+xml'
      }
    }]
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: '[path][hash].[ext]'
      },
    }],
  },
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  // webpack 1
  // webpackConfig.module.loaders.filter((loader) =>
  //   loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  // ).forEach((loader) => {
  //   const [first, ...rest] = loader.loaders
  //   loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
  //   Reflect.deleteProperty(loader, 'loaders')
  // })
  //
  // webpackConfig.plugins.push(
  //   new ExtractTextPlugin('[name].[contenthash].css', {
  //     allChunks: true
  //   })
  // )
  //
  const extractCSSPlugin = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    allChunks: true
  })

  webpackConfig.module.rules.filter((loader) =>
    loader.use && loader.use.find((l) => {
      return l.loader === 'css-loader'
    })
  ).forEach((loader, index) => {
    const [first, ...rest] = loader.use
    Reflect.deleteProperty(loader, 'use')
    loader.use = extractCSSPlugin.extract({
      fallback: first,
      use: rest
    })
  })

  webpackConfig.plugins.push(
    // webpack 1
    // new ExtractTextPlugin('[name].[contenthash].css', {
    //   allChunks: true
    // })
    extractCSSPlugin
  )
}

export default webpackConfig
