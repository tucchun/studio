import {
  UPDATECOLLECT,
  FETCH_ORDER_LIST_SUCCESS,
  FETCH_ORDER_LIST_FAILURE,
  CLICK_ORDER_STATUS,
  CHANGE_INPUT_DATA,
  FETCH_ORDER_INFO_SUCCESS,
  FETCH_ORDER_INFO_FAILURE,
  PAGE_TURN
} from './constants'
import { toggleLoading } from '../actions'
import ajax from '../../utils/ajax'
export function setCollect (count) {
  return {
    type: UPDATECOLLECT,
    count
  }
}

export function fetchOrderListSuccess (result) {
  return {
    type: FETCH_ORDER_LIST_SUCCESS,
    result
  }
}

export function fetchOrderListError (errorMsg) {
  return {
    type: FETCH_ORDER_LIST_FAILURE,
    errorMsg
  }
}
// 请求订单列表
export const fetchOrderList = (searchData) => (dispatch) => {
  dispatch(toggleLoading(true)) // 显示loding
  return ajax({
    url: '/los/2b-admin-front.getOrderShopList',
    data: searchData
  }).then(res => {
    dispatch(toggleLoading(false)) // 关闭loading
    dispatch(fetchOrderListSuccess(res))
  }).catch(err => {
    dispatch(toggleLoading(false)) // 关闭loading
    dispatch(fetchOrderListError(err))
  })
}

export function updatePageIndex (pageIndex) {
  return {
    type: PAGE_TURN,
    pageIndex
  }
}

export const pageTurn = (pageIndex) => (dispatch, getState) => {
  debugger
  let { orderLst } = getState()
  dispatch(fetchOrderList({
    ...orderLst.searchData,
    pageNo: pageIndex
  })).then(() => {
    dispatch(updatePageIndex(pageIndex))
  })
}

export function clickOrderStatus (orderStatus) {
  return {
    type: CLICK_ORDER_STATUS,
    orderStatus
  }
}

// input 输入事件
export function doInputChange (result) {
  return {
    type: CHANGE_INPUT_DATA,
    result
  }
}

export function fetchOrderInfoSuccess (result) {
  return {
    type: FETCH_ORDER_INFO_SUCCESS,
    result
  }
}

export function fetchOrderInfoFailure (errorMsg) {
  return {
    type: FETCH_ORDER_INFO_FAILURE,
    errorMsg
  }
}
// 请求订单详情
export const fetchOrderInfo = (searchData) => (dispatch) => {
  dispatch(toggleLoading(true)) // 显示loding
  return ajax({
    url: '/los/2b-admin-front.queryOrderDetils',
    data: searchData
  }).then(res => {
    dispatch(toggleLoading(false)) // 隐藏loading
    dispatch(fetchOrderInfoSuccess(res))
  }).catch(err => {
    dispatch(toggleLoading(false)) // 关闭loading
    dispatch(fetchOrderInfoFailure(err))
  })
}
