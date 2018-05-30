import * as OrderResultConst from './constants'
export function orderResultData (state = {
  orderMsg: {}
}, action) {
  switch (action.type) {
    case OrderResultConst.GET_ORDER_STATUS:
      return {
        orderMsg: {
          ...state,
          ...action.result
        }
      }
    default:
      return {
        ...state
      }
  }
}
