import * as BalanceConst from './constants'
import { toggleLoading } from '../actions'
import ajax from '../../utils/ajax'

function getAddressListSuccess (result) {
  return {
    type: BalanceConst.FETCH_ADDRESS_LIST_SUCCESS,
    result
  }
}

function getAddressListFail (err) {
  return {
    type: BalanceConst.FETCH_ADDRESS_LIST_FAIL,
    err
  }
}

function fetchAddressSuccess (res) {
  return {
    type: BalanceConst.FETCH_ADDRESS_NEW_SUCCESS,
    result: res
  }
}

function submitOrderSuccess (res) {
  return {
    type: BalanceConst.FETCH_ORDER_SUCCESS,
    result: res
  }
}

export function getRemark (remark) {
  return {
    type: BalanceConst.GET_REMARK,
    result: remark
  }
}

export function getOrderMsg (OrderMsg) {
  return {
    type: BalanceConst.GET_ORDER_MSG,
    result: OrderMsg
  }
}

export function dialogControl (dialogStatus) {
  return {
    type: BalanceConst.OPEN_DIALOG,
    result: dialogStatus
  }
}

export function choseAddress (addressId) {
  return {
    type: BalanceConst.CLICK_ADDRESS,
    result: addressId
  }
}

export function confirmCheck () {
  return {
    type: BalanceConst.CONFIRM_ADDRESS
  }
}

export function controlAddressEditor (editorStatus, updateStatus) {
  return {
    type: BalanceConst.CONTROL_EDITOR_ADDERSS,
    result: {
      updateStatus,
      editorStatus
    }
  }
}

export const submitOrder = (productCodes, recipientId, remark) => (dispatch) => {
  dispatch(toggleLoading(true))
  return ajax({
    url: '/los/2b-admin-front.subOrderShop',
    data: {
      productCodes,
      recipientId,
      remark
    }
  }).then(res => {
    console.log(res)
    dispatch(toggleLoading(false))
    dispatch(submitOrderSuccess(res))
  }).catch(err => {
    console.log(err)
  })
}

export const fetchAddress = (address) => (dispatch) => {
  console.log(address)
  dispatch(toggleLoading(true))
  let pd = {}
  if (address.addressId) {
    pd = ajax({
      url: '/los/2b-admin-front.updateRecipient',
      data: {
        ...address
      }
    }).then(res => {
      dispatch(toggleLoading(false))
      dispatch(getAddressList())
      dispatch(fetchAddressSuccess(res))
      dispatch(controlAddressEditor(false, false))
      console.log(res)
    }).catch(err => {
      toggleLoading(false)
      console.log(err)
    })
  } else {
    pd = ajax({
      url: '/los/2b-admin-front.saveRecipient',
      data: {
        ...address
      }
    }).then(res => {
      dispatch(toggleLoading(false))
      dispatch(getAddressList())
      dispatch(fetchAddressSuccess(res))
      dispatch(controlAddressEditor(false, false))
      console.log(res)
    }).catch(err => {
      dispatch(false)
      console.log(err)
    })
  }
  return pd
}

export const getAddressList = () => (dispatch) => {
  dispatch(toggleLoading(true))
  debugger
  return ajax({
    url: '/los/2b-admin-front.queryCustRecipient'
  }).then(res => {
    dispatch(toggleLoading(false))
    dispatch(getAddressListSuccess(res))
  }).catch(err => {
    console.log(err)
    dispatch(getAddressListFail(err))
  })
}
