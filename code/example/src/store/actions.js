import * as OrderAction from './order/actions'
import { SHOW_LOADING, UPDATE_BREAD_LIST } from './constants'
// 是否显示loading
export function toggleLoading (show) {
  return {
    type: SHOW_LOADING,
    show
  }
}

export function updateBreadList (breadList) {
  return {
    type: UPDATE_BREAD_LIST,
    breadList
  }
}

export {
  OrderAction
}
