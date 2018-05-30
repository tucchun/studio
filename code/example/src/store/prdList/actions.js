import {
  FETCH_PRD_LIST_SUCCESS,
  FETCH_PRD_LIST_ASC_OR_DESC,
  UPDATE_PARAMS,
  FETCH_PRD_LIST_FAILURE,
  FETCH_CLASSIFY_LIST
} from './constants'
import { toggleLoading } from '../actions'
import ajax from '../../utils/ajax'

export function fetchPrdListSuccess (result) {
  return {
    type: FETCH_PRD_LIST_SUCCESS,
    result
  }
}
// action {isIncreCur: true}
export function queryPrdListByAsc (action) {
  return {
    type: FETCH_PRD_LIST_ASC_OR_DESC,
    action
  }
}
export function updateParams (params) {
  return {
    type: UPDATE_PARAMS,
    params
  }
}

export function fetchPrdListFailure (errorMsg) {
  return {
    type: FETCH_PRD_LIST_FAILURE,
    errorMsg
  }
}
// 请求商品列表
export const fetchPrdList = (searchData) => (dispatch) => {
  dispatch(toggleLoading(true)) // 显示loding
  return ajax({
    url: '/los/2b-admin-front.productPageList',
    data: searchData
  }).then(res => {
    dispatch(toggleLoading(false)) // 隐藏loading
    dispatch(fetchPrdListSuccess(res))
  }).catch(err => {
    dispatch(toggleLoading(false)) // 关闭loading
    dispatch(fetchPrdListFailure(err))
  })
}
// 请求三级分类列表
export const fetchClassifyList = (searchData) => (dispatch) => {
  return ajax({
    url: '/los/2b-admin-front.queryFrontClassById',
    data: searchData
  }).then(result => {
    dispatch({
      type: FETCH_CLASSIFY_LIST,
      result
    })
  })
}
