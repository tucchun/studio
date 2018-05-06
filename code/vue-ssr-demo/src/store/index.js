import Vue from 'vue'
import Vuex from 'vuex'
import { fetchBlogList } from '../api'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      blogList: []
    },
    actions: {
      fetchBlogList ({ commit }, blogType) {
        // `store.dispatch()` 会返回 Promise
        // 以便我们能够知道数据在何时更新
        return fetchBlogList(blogType).then(list => {
          commit('setItem', { blogType, list })
        })
      }
    },
    mutations: {
      setItem (state, { blogType, list }) {
        state.blogList = list
        // Vue.set(state.blogList, list)
      }
    }
  })
}
