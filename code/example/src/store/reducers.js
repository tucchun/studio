// import { combineReducers } from 'redux'
import * as OrderReducer from './order/reducers'
import { SHOW_LOADING, UPDATE_BREAD_LIST } from './constants'

// 公共数据
function global (state = {
  showLoading: false,
  breadList: [
    { name: '首页', href: '/' }
  ],
  headerNums: {
    cartNums: 0,
    collectNums: 0
  }
}, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        showLoading: action.show
      }
    case UPDATE_BREAD_LIST:
      return {
        ...state,
        breadList: action.breadList
      }
    default:
      return state
  }
}

export default {
  global,
  ...OrderReducer
}
