import * as OrderResultConst from './constants'

export function getOrderMsg (order) {
  return {
    type: OrderResultConst.GET_ORDER_STATUS,
    result: order
  }
}
