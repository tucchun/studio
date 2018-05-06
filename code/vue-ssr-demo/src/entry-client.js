import { createApp } from './app'
import Vue from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'

// bar 加载指示器
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  // 添加路由钩子函数，用于处理asyncData。
  // 在初始路由resolve后执行，
  // 以便我们不会二次预取(double-fetch)已有数据。
  // 使用`router.beforeResolve()`, 以便确保所以异步组件都resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const preMatched = router.getMatchedComponents(from)

    // 我们只关心之前没有渲染的组件
    // 所以我们队比他们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (preMatched[i]) !== c)
    })

    if (!activated.length) {
      return next()
    }
    bar.start()
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({store, route: to})
      }
    })).then(() => {
      bar.finish()
      next()
    }).catch(next)
  })
  app.$mount('#app')
})
