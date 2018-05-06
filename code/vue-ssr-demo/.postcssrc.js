// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // "postcss-import": {},
    // "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      add: true,
      remove: true,
      browsers: ['ie >= 8', 'firefox >= 15', 'iOS 7']
    }
  }
}
