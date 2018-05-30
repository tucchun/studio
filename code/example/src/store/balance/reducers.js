import * as BalanceConst from './constants'

export function balanceData (state = {
  recipientList: [],
  address: {},
  cartItems: [],
  cartTotalAmount: '',
  addressShow: true,
  editorShow: false,
  remark: '',
  dialog: false,
  updateAddress: true,
  orderMsg: {}
}, action) {
  let recipientList = []
  let result = action.result
  let address = {}
  switch (action.type) {
    case BalanceConst.FETCH_ADDRESS_LIST_SUCCESS:
      recipientList = result.recipientList
      for (let i in recipientList) {
        let isChosed = recipientList[i].flag === 'Y' ? true : false
        let isChecked = isChosed
        let isDefault = isChosed
        recipientList[i] = {
          ...recipientList[i],
          isChosed,
          isChecked,
          isDefault
        }
        if (isChosed) {
          address = recipientList[i]
        }
      }
      return {
        ...state,
        recipientList,
        address
      }
    case BalanceConst.GET_ORDER_MSG:
      console.log(result)
      let cartItems = result.cartItems || []
      let cartTotalAmount = result.cartTotalAmount || ''
      return {
        ...state,
        cartItems,
        cartTotalAmount
      }
    case BalanceConst.OPEN_DIALOG:
      return {
        ...state,
        dialog: result
      }
    case BalanceConst.CLICK_ADDRESS:
      let addressId = result
      recipientList = state.recipientList
      for (let i in recipientList) {
        recipientList[i].isChecked = recipientList[i].addressId === addressId ? true : false
      }
      return {
        ...state,
        recipientList
      }
    case BalanceConst.CONFIRM_ADDRESS:
      recipientList = state.recipientList
      address = {}
      for (let i in recipientList) {
        if (recipientList[i].isChecked) {
          address = recipientList[i]
        }
      }
      return {
        ...state,
        address
      }
    case BalanceConst.CONTROL_EDITOR_ADDERSS:
      let editorShow = result.editorStatus
      let addressShow = !result.editorStatus
      let updateAddress = result.updateStatus
      return {
        ...state,
        addressShow,
        editorShow,
        updateAddress
      }
    case BalanceConst.FETCH_ADDRESS_NEW_SUCCESS:
      console.log(result)
      return {
        ...state
      }
    case BalanceConst.GET_REMARK:
      console.log(result)
      return {
        ...state,
        remark: result
      }
    case BalanceConst.FETCH_ORDER_SUCCESS:
      console.log(result)
      return {
        ...state,
        orderMsg: {
          ...result
        }
      }
    default:
      return state
  }
}
