import { FETCH_PRD_PRDDETAILS_SUCCESS, UPDATE_PARAMS, FETCH_PRD_PRDDETAILS_FAILURE,
  DO_PRCSCOUNT_CHANGE_CLICK, DO_SCROLL_ARROW, FETCH_CLASSIFY_LIST, UPDATE_CURRENT_INDEX } from './constants'
import { toggleLoading } from '../actions'
import ajax from '../../utils/ajax'

export function fetchPrdDetailsSuccess (result) {
  return {
    type: FETCH_PRD_PRDDETAILS_SUCCESS,
    result
  }
}
export function updateParams (params) {
  return {
    type: UPDATE_PARAMS,
    params
  }
}

export function fetchPrdDetailsFailure (errorMsg) {
  return {
    type: FETCH_PRD_PRDDETAILS_FAILURE,
    errorMsg
  }
}
// 请求商品详情
export const fetchPrdDetails = (searchData) => (dispatch) => {
  dispatch(toggleLoading(true)) // 显示loding
  return ajax({
    url: '/los/2b-admin-front.getProductDetails',
    data: searchData
  }).then(res => {
    dispatch(toggleLoading(false)) // 隐藏loading
    dispatch(fetchPrdDetailsSuccess(res))
  }).catch(err => {
    dispatch(toggleLoading(false)) // 关闭loading
    dispatch(fetchPrdDetailsFailure(err))
  })
}
// 请求三级分类列表
export const fetchClassifyList = (searchData) => (dispatch) => {
  return ajax({
    url: '/los/2b-admin-front.queryFrontClassById',
    data: searchData
  }).then(result => {
    console.log(result)
    dispatch({
      type: FETCH_CLASSIFY_LIST,
      result
    })
  })
}
export function doPrcsCountChangeClick (prcsCount) {
  return {
    type: DO_PRCSCOUNT_CHANGE_CLICK,
    prcsCount
  }
}
export function doScrollArrow (params) {
  return {
    type: DO_SCROLL_ARROW,
    params
  }
}
export function updateCurrentIndex (params) {
  return {
    type: UPDATE_CURRENT_INDEX,
    params
  }
}
