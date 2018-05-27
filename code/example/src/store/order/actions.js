import { OrdersConst } from '../constants'
import { toggleLoading } from '../actions'
import ajax from '../../utils/ajax'
export function setCollect (count) {
  return {
    type: OrdersConst.UPDATECOLLECT,
    count
  }
}

export function fetchOrderListSuccess (result) {
  return {
    type: OrdersConst.FETCH_ORDER_LIST_SUCCESS,
    result
  }
}

export function fetchOrderListError (errorMsg) {
  return {
    type: OrdersConst.FETCH_ORDER_LIST_FAILURE,
    errorMsg
  }
}

export const fetchOrderList = (searchData) => (dispatch) => {
  dispatch(toggleLoading(true)) // 显示loding
  return ajax({
    url: '/los/2b-admin-front.getOrderShopList',
    data: searchData
  }).then(res => {
    debugger
    dispatch(toggleLoading(false)) // 关闭loading
    dispatch(fetchOrderListSuccess(res.orderList))
  }).catch(err => {
    debugger
    dispatch(toggleLoading(false)) // 关闭loading
    dispatch(fetchOrderListError(err))
  })
}

export function clickOrderStatus (orderStatus) {
  return {
    type: OrdersConst.CLICK_ORDER_STATUS,
    orderStatus
  }
}

// input 输入事件
export function doInputChange (result) {
  return {
    type: OrdersConst.CHANGE_INPUT_DATA,
    result
  }
}

export function fetchOrderInfoSuccess (result) {
  return {
    type: OrdersConst.FETCH_ORDER_INFO_SUCCESS,
    result
  }
}

export function fetchOrderInfoFailure (errorMsg) {
  return {
    type: OrdersConst.FETCH_ORDER_INFO_FAILURE,
    errorMsg
  }
}
// 请求订单列表
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
