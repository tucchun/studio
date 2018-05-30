import * as ShopcartConst from './constants'
import { toggleLoading } from '../actions'
import ajax from '../../utils/ajax'

export function getShopCartListSuccess (result) {
  console.log(result)
  return {
    type: ShopcartConst.FETCH_SHOPCART_LIST_SUCCESS,
    result
  }
}

export function getShopCartListFail (errorMsg) {
  return {
    type: ShopcartConst.FETCH_SHOPCART_LIST_FAIL,
    errorMsg
  }
}

export function switchAllCheck (allChecked) {
  console.log(allChecked)
  return {
    type: ShopcartConst.CLICK_ALLCHECKED,
    result: allChecked
  }
}

export function switchCheckStatus (prdCode) {
  let checkedProductCode = prdCode
  return {
    type: ShopcartConst.SWITCH_CHECK_STATUS,
    result: checkedProductCode
  }
}

function submitSuccess (res) {
  return {
    type: ShopcartConst.FETCH_SUBMIT_ORDER_SUCCESS,
    result: res
  }
}

export const getShopCartList = () => (dispatch) => {
  dispatch(toggleLoading(true))
  return ajax({
    url: '/los/2b-admin-front.getCartList'
  }).then(res => {
    dispatch(toggleLoading(false))
    dispatch(getShopCartListSuccess(res))
    return res
  }).catch(err => {
    dispatch(toggleLoading(false))
    dispatch(getShopCartListFail(err))
    return err
  })
}

export const delGoods = (prdCode) => (dispatch) => {
  dispatch(toggleLoading(true))
  let productCodes = new Array(prdCode)
  return ajax({
    url: '/los/2b-admin-front.deleteCart',
    data: {
      productCodes
    }
  }).then(res => {
    console.log(res)
  })
}

export const changeCount = (productNum, productCode) => (dispatch) => {
  dispatch(toggleLoading(true))
  return ajax({
    url: '/los/2b-admin-front.changeCartNum',
    data: {
      productNum,
      productCode
    }
  }).then(res => {
    console.log(res)
  })
}

export const submitOrder = (productCodes) => (dispatch) => {
  if (!productCodes.length) {
    alert('商品不能为空')
    return new Promise(function () {})
  }
  dispatch(toggleLoading(true))
  return ajax({
    url: '/los/2b-admin-front.buyOrderShop',
    productCodes
  }).then(res => {
    dispatch(submitSuccess(res))
    return res
  }).catch(
    err => {
      console.log(err)
    }
  )
}
