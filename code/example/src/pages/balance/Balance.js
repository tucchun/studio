import React, { Component } from 'react'
import { Address, EditorAddress, ChoseAddress } from '../../components/address/index'
import { GoodsTable } from '../../components/goodsItem/index'
import { Button } from '../../components/form/index'
import style from './style.scss'
import { multStyle } from '../../utils/common'
import { Link } from 'react-router-dom'
import Dialog from '../../components/dialog/index'
import * as BalanceAction from '../../store/balance/actions'
import { updateBreadList } from '../../store/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Balance extends Component {
  constructor (props) {
    super(props)
    this.choseAddress = this.choseAddress.bind(this)
    this.newAddress = this.newAddress.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
    this.dialogControl = this.dialogControl.bind(this)
    this.confirmCheck = this.confirmCheck.bind(this)
    this.getRemark = this.getRemark.bind(this)
    console.log('constructor')
  }

  componentDidMount () {
    const { dispatch, shopCartData } = this.props
    let orderMsg = shopCartData.orderInfo
    dispatch(updateBreadList([
      { name: '首页', href: '/' },
      { name: '结算', href: './balance' }
    ]))
    dispatch(BalanceAction.getAddressList())
    dispatch(BalanceAction.getOrderMsg(orderMsg))
    console.log('component did mount')
  }

  dialogControl (dialogStatus) {
    const { dispatch } = this.props
    dispatch(BalanceAction.dialogControl(dialogStatus))
  }

  choseAddress (addressId) {
    const { dispatch } = this.props
    dispatch(BalanceAction.choseAddress(addressId))
  }

  confirmCheck () {
    const { dispatch } = this.props
    dispatch(BalanceAction.confirmCheck())
    dispatch(BalanceAction.dialogControl(false))
  }

  setAddState (type) {
    const { dispatch } = this.props
    switch (type) {
      case 'new':
        dispatch(BalanceAction.controlAddressEditor(true, false))
        break
      case 'update':
        dispatch(BalanceAction.controlAddressEditor(true, true))
        break
      case 'cancel':
        dispatch(BalanceAction.controlAddressEditor(false, false))
        break
      default:
        dispatch(BalanceAction.controlAddressEditor(true, false))
        break
    }
  }

  newAddress (address) {
    // 新增地址&修改地址
    const { dispatch } = this.props
    dispatch(BalanceAction.fetchAddress(address))
  }

  getRemark (remark) {
    const { dispatch } = this.props
    dispatch(BalanceAction.getRemark(remark))
  }

  submitOrder () {
    const { dispatch, balanceData } = this.props
    let productCodes = balanceData.cartItems.map(item => {
      return item.productCode
    })
    let recipientId = balanceData.address.addressId
    let remark = balanceData.remark
    dispatch(BalanceAction.submitOrder(productCodes, recipientId, remark)).then(res => {
      this.props.history.push({
        pathname: '/pages/orderResult',
        state:res
      })
    })
  }

  render () {
    let addressList = this.props.balanceData.recipientList
    let cartItems = this.props.balanceData.cartItems
    let address = this.props.balanceData.address
    let cartTotalAmount = this.props.balanceData.cartTotalAmount
    let totalProduct = this.props.shopCartData.totalProduct
    let totalProductType = this.props.shopCartData.totalProductType
    let dialog = this.props.balanceData.dialog
    let editorShow = this.props.balanceData.editorShow
    let addressShow = this.props.balanceData.addressShow
    let updateAddress = this.props.balanceData.updateAddress
    return (
      <div>
        <div className={multStyle(style.addressInfo)}>
          <div className={style.title}>
            收货信息
          </div>
          <Address address={address} show={addressShow} new={
            () => {
              console.log('ddddddd')
              this.setAddState('new')
            }
          } change={
            () => {
              this.dialogControl(true)
            }
          } modify={
            () => {
              this.setAddState('update')
            }
          } />
          <EditorAddress show={editorShow} cancel={
            () => {
              this.setAddState('cancel')
            }
          } submit={
            (district) => {
              this.newAddress(district)
            }
          } isUpdate={updateAddress} address={address} />
        </div>
        <GoodsTable goodsList={cartItems} remarkStatus={'editor'} getRemark={
          (remark) => {
            this.getRemark(remark)
          }
        } />
        <div className={style.submitInfo}>
          <div className={style.priceTotal}>
            <p>总计</p>
            <div className={'clearfix'}>
              <div className={'pull-left'}>
                <span>商品种类(SKU)：{totalProductType}</span>
                <span>商品件数：{totalProduct}</span>
              </div>
              <div className={'pull-right'}>
                <span>商品合计：￥{new Number(cartTotalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className={'clearfix'}>
            <div className={style.priceDeal}>应付总额：<span>￥{new Number(cartTotalAmount).toFixed(2)}</span></div>
            <div className={'clearfix'}>
              <Link to={'/shopcart'}>
                <Button className={'pull-left'} icon='icon-back'>返回购物车</Button>
              </Link>
              <Button size='large' type='secondary' className={'pull-right'} onClick={
                this.submitOrder
              }>提交订单</Button>
            </div>
          </div>
        </div>
        <Dialog show={dialog} width={724} height={670}>
          <div className={style.dialog}>
            <div className={style.title}>选择就地址</div>
            <div className={style.dialog_content}>
              {
                addressList.map(addressItem => {
                  return <ChoseAddress key={addressItem.addressId} address={addressItem} getAddressId={
                    (addressId) => {
                      this.choseAddress(addressId)
                    }
                  } />
                })
              }
            </div>
            <div className={multStyle(style.dialog_opt, 'clearfix')}>
              <Button className={multStyle('pull-left', style.btn)} type={'secondary'} onClick={
                () => {
                  this.confirmCheck()
                }
              }>确定</Button>
              <Button className={multStyle('pull-right', style.btn)} onClick={
                () => {
                  this.dialogControl(false)
                }
              } >取消</Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

Balance.propTypes = {
  dispatch:PropTypes.func,
  balanceData:PropTypes.object,
  shopCartData:PropTypes.object
}

const mapStateToProps = state => {
  return {
    balanceData:state.balanceData,
    shopCartData:state.shopCartData
  }
}
export default connect(
  mapStateToProps
)(Balance)
