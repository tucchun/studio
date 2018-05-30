import * as ShopcartConst from './constants'
import math from 'mathjs'
// 购物车

export function shopCartData (state = {
  goodsList: [],
  allChecked: true,
  checkedProductCode: [],
  dialogStatus: false,
  cartTotalAmount: '',
  totalProduct: '',
  totalProductType: '',
  orderInfo: {}
}, action) {
  console.log(action)
  let checkedProductCode = []
  switch (action.type) {
    case ShopcartConst.FETCH_SHOPCART_LIST_SUCCESS :
      checkedProductCode = []
      let goodsList = action.result.cartItems
      for (let i in goodsList) {
        goodsList[i].checked = parseInt(goodsList[i].checked) === 1 ? true : false
        goodsList[i].productPrice = parseFloat(goodsList[i].productPrice)
        if (goodsList[i].checked) {
          checkedProductCode.push(goodsList[i].productCode)
        }
      }
      console.log(goodsList)
      return {
        ...state,
        goodsList,
        checkedProductCode,
        cartTotalAmount: action.result.cartTotalAmount,
        totalProduct: action.result.totalProduct,
        totalProductType: action.result.totalProductType
      }
    case ShopcartConst.CLICK_ALLCHECKED:
      checkedProductCode = []
      let totalProductType = 0
      for (let i in state.goodsList) {
        state.goodsList[i].checked = action.result.allChecked
        if (action.result.allChecked) {
          checkedProductCode.push(state.goodsList[i].productCode)
        }
      }
      let price = compute()
      totalProductType = checkedProductCode.length
      return {
        ...state,
        ...action.result,
        checkedProductCode,
        ...price,
        totalProductType
      }
    case ShopcartConst.SWITCH_CHECK_STATUS :
      checkedProductCode = action.result
      goodsList = state.goodsList
      let allChecked = checkedProductCode.length === goodsList.length ? true : false
      for (let i in goodsList) {
        let index = checkedProductCode.indexOf(goodsList[i].productCode)
        if (index >= 0) {
          goodsList[i].checked = true
        } else {
          goodsList[i].checked = false
        }
      }
      let obj = compute()
      return {
        ...state,
        checkedProductCode,
        goodsList,
        ...obj,
        allChecked,
        totalProductType: checkedProductCode.length
      }
    case ShopcartConst.FETCH_SUBMIT_ORDER_SUCCESS:
      console.log(action.result)
      let orderInfo = action.result
      return {
        ...state,
        orderInfo
      }
    default:
      return state
  }
  function compute () {
    let goodsList = state.goodsList
    let cartTotalAmount = 0
    let totalProduct = 0
    for (let i in goodsList) {
      if (goodsList[i].checked) {
        cartTotalAmount = math.eval(cartTotalAmount + parseFloat(goodsList[i].priceAmount))
        totalProduct = math.eval(totalProduct + parseInt(goodsList[i].count))
      }
    }
    return { cartTotalAmount, totalProduct }
  }
}
