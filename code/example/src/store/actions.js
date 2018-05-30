
import {
  SHOW_LOADING,
  UPDATE_BREAD_LIST,
  UPDATE_HEADER_NUM,
  UPDATE_AUTH,
  UPDATE_CLASSFY_NUM
} from './constants'
import ajax from '../utils/ajax'
// 是否显示loading
export function authName (authList) {
  return {
    type: UPDATE_AUTH,
    authList
  }
}
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

// 更新header模块 收藏 购物数量
export function updateHeadNums (headerNums) {
  return {
    type: UPDATE_HEADER_NUM,
    headerNums
  }
}
// 更新分类
export function updateClassifyTree (classify) {
  return {
    type: UPDATE_CLASSFY_NUM,
    classify
  }
}

export const fetchShopCartNums = () => (dispatch) => {
  return ajax({
    url: '/los/2b-admin-front.getCartNum'
  }).then(res => {
    dispatch(updateHeadNums({ cartNums: Number(res.totalProduct) }))
  })
}

export const fetchCollectNums = () => (dispatch) => {
  return ajax({
    url: '/los/2b-admin-front.custFavoriteCount'
  }).then(res => {
    dispatch(updateHeadNums({ collectNums: Number(res.totalCount) }))
  })
}

export const fetchClissifyTree = () => (dispatch) => {
  return ajax({
    url: '/los/2b-admin-front.queryFrontClassTree'
  }).then(res => {
    dispatch(updateClassifyTree({list: res.frontClassifyTree}))
  })
}
