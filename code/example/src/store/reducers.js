import { SHOW_LOADING, UPDATE_BREAD_LIST, UPDATE_HEADER_NUM, UPDATE_AUTH, UPDATE_CLASSFY_NUM } from './constants'

export function updateAuthing (state = {
  nickName: 'guest',
  login: false
}, action) {
  switch (action.type) {
    case UPDATE_AUTH:
      return { ...action.authList }
    default:
      return state
  }
}

// loading 状态
export function loading (state = false, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return action.show
    default:
      return state
  }
}

// 导航 面包屑数据
export function breadList (state = [
  { name: '首页', href: '/' }
], action) {
  switch (action.type) {
    case UPDATE_BREAD_LIST:
      return [
        ...action.breadList
      ]
    default:
      return state
  }
}
// 分类
export function classify (state = [], action) {
  switch (action.type) {
    case UPDATE_CLASSFY_NUM:
      return {
        ...state,
        ...action.classify
      }
    default:
      return state
  }
}
// 购物车 收藏 数量
export function headerNums (state = {
  cartNums: 0,
  collectNums: 0
}, action) {
  switch (action.type) {
    case UPDATE_HEADER_NUM:
      return {
        ...state,
        ...action.headerNums
      }
    default:
      return state
  }
}
