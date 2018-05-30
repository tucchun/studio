import {
  FETCH_ORDER_LIST_SUCCESS,
  CLICK_ORDER_STATUS,
  CHANGE_INPUT_DATA,
  FETCH_ORDER_INFO_SUCCESS,
  PAGE_TURN
} from './constants'

// 订单列表
export function orderLst (state = {
  girdData: [],
  pageNumber: 1,
  currentPage: 1,
  total: 0,
  searchData: {
    startTime: undefined, // 开始时间
    endTime: undefined, // 结束时间
    orderNo: '', // 订单号
    pageNo: 0, // 页码
    pageSize: 5, // 每页记录数
    recipientName: '', // 收货人名称
    recipientPhone: '', // 收货人电话
    orderStatus: '' // 订单状态
  }
}, action) {
  switch (action.type) {
    case FETCH_ORDER_LIST_SUCCESS:
      return {
        ...state,
        girdData: action.result.orderList,
        total: action.result.totalCount
      }
    case CLICK_ORDER_STATUS:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          orderStatus: action.orderStatus
        }
      }
    case CHANGE_INPUT_DATA:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          [action.result.name]: action.result.value
        }
      }
    case PAGE_TURN:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          pageNo: action.pageIndex
        }
      }
    default:
      return state
  }
}

// 订单详情
export function ordersInfo (state = {
  orderId: '',
  orderStatus: '',
  productCount: '',
  recipientName: '',
  recipientProvince: '',
  recipientCity: '',
  recipientAddress: '',
  postCode: '',
  recipientPhone: '',
  recipientFxPhone: '',
  settleMode: '',
  amount: 0,
  orderShopItems: []
}, action) {
  switch (action.type) {
    case FETCH_ORDER_INFO_SUCCESS:
      return {
        ...state,
        ...action.result.orderShopDetilsDTO
      }
    default:
      return state
  }
}
