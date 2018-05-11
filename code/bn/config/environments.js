// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.
export default {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  local: (config) => ({
    // compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    umengkey: '1271410175',
    proxy: {
      enabled: false,
      options: {
        host: 'http://localhost:8000',
        match: /^\/api\/.*/
      }
    }
  }),

  dev: (config) => ({
    // compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    compiler_public_path: './',
    umengkey: '1271410175',
  }),

  fvt: (config) => ({
    compiler_public_path: './',
    umengkey: '1271410200',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: false,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  }),

  uat: (config) => ({
    compiler_public_path: './',
    umengkey: '1271410634',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: false,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  prd: (config) => ({
    compiler_public_path: './',
    umengkey: '1271410159',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'hash',
    compiler_devtool: false,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
}
