import React, { Component } from 'react'
import Breadcrumb from '../../components/breadcrumb/index'
import { Address, EditorAddress, ChoseAddress } from '../../components/address/index'
import { GoodsTable } from '../../components/goodsItem/index'
import { Button } from '../../components/form/index'
import style from './style.scss'
import { multStyle } from '../../utils/common'
import Template from '../template'
import { Link } from 'react-router-dom'
import Dialog from '../../components/dialog/index'
import ajax from '../../utils/ajax'
import { withIndexTemplate } from '../template'
import Text from '../../components/form/Text'
class Balance extends Component {
  constructor (props) {
    super(props)
    this.setAddState = this.setAddState.bind(this)
    this.getAddressList = this.getAddressList.bind(this)
    this.choseAddress = this.choseAddress.bind(this)
    this.newAddress = this.newAddress.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
    this.state = {
      HeaderNums: {
        cartNums: 10,
        collectNums: 10
      },
      breadList: [
        { name: '首页', href: '/' },
        { name: '清洁用品', href: '/' },
        { name: '消毒用品', href: '/' },
        { name: '消毒液', href: '/' }
      ],
      addressList: [],
      address:{},
      cartItems:[],
      cartTotalAmount:'',
      addressShow: true,
      editorShow: false,
      remark:'',
      dialog: false
    }
  }

  componentDidMount () {
    this.getAddressList()
    if (this.props.location.state) {
      this.setState({
        ...this.props.location.state
      })
    }
  }

  getAddressList () {
    ajax({
      url: '/los/2b-admin-front.queryCustRecipient'
    }).then(res => {
      let addressList = res.recipientList, address = {}
      for (let i in addressList) {
        let isChosed = addressList[i].flag === 'Y' ? true : false
        let isChecked = isChosed
        let isDefault = isChosed
        addressList[i] = {
          ...addressList[i],
          isDefault,
          isChosed,
          isChecked
        }
        if (addressList[i].flag === 'Y'){
          address = addressList[i]
        }
      }
      this.setState({
        addressList,
        address
      })
    })
  }

  setAddState () {
    this.setState({
      addressShow: false,
      editorShow: true
    })
  }

  choseAddress (addressId) {
    console.log(addressId)
    let addressList = this.state.addressList
    for (let i in addressList) {
      if (addressList[i].addressId === addressId) {
        addressList[i].isChecked = true
      } else {
        addressList[i].isChecked = false
      }
    }
    this.setState({
      addressList
    })
  }

  newAddress (address) {
    // 新增地址
    let recipientProvince = address.district.recipientProvinceLabel,
      recipientCity = address.district.recipientCityLabel,
      recipientCountry = address.district.recipientCountryLabel, postCode = address.postCode,
      recipientAddress = address.recipientAddress,
      recipientFxPhone = address.recipientFxPhone, recipientName = address.recipientName,
      recipientPhone = address.recipientPhone, flag = address.flag
    if (recipientProvince && recipientCity && recipientCountry &&
      postCode && recipientAddress && recipientFxPhone &&
      recipientName && recipientPhone && flag) {
      ajax({
        url: '/los/2b-admin-front.saveRecipient',
        data: {
          recipientProvince,
          recipientCity,
          recipientCountry,
          postCode,
          recipientAddress,
          recipientFxPhone,
          recipientName,
          recipientPhone,
          flag
        }
      }).then(res => {
        console.log(res)
      })
      this.setState({
        addressShow: true,
        editorShow: false
      })
    } else {
      alert('请填写完整地址')
    }
  }

  submitOrder () {
    let addressList = this.state.addressList
    let productCodes = this.state.cartItems.map(item => {
      return item.productCode
    })
    let recipientId = ''
    for (let i in addressList) {
      if (addressList[i].isChosed) {
        recipientId = addressList[i].addressId
      }
    }
    let remark = this.state.remark
    let data = { productCodes, recipientId, remark }
    ajax({
      url:'/los/2b-admin-front.subOrderShop',
      data
    }).then(res => {
      this.props.history.push({
        pathname:'/orderResult',
        state:res
      })
    })
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <Breadcrumb breads={this.state.breadList} />
        <div className={multStyle(style.addressInfo)}>
          <div className={style.title}>
            收货信息
          </div>
          <Address address={this.state.address} show={this.state.addressShow} new={
            () => {
              this.setAddState()
            }
          } change={
            () => {
              this.setState({ dialog: true })
            }
          } modify={
            this.setAddState
          } />
          <EditorAddress show={this.state.editorShow} cancel={
            () => {
              this.setState({
                addressShow: true,
                editorShow: false
              })
            }
          } submit={
            (discrict) => {
              this.newAddress(discrict)
            }
          } />
        </div>
        <GoodsTable goodsList={this.state.cartItems} remarkStatus={'editor'} getRemark={
          (remark) => {
            this.setState({
              remark
            })
          }
        } />
        <div className={style.submitInfo}>
          <div className={style.priceTotal}>
            <p>总计</p>
            <div className={'clearfix'}>
              <div className={'pull-left'}>
                <span>商品种类(SKU)：{this.state.totalProductType}</span>
                <span>商品件数：{this.state.totalProduct}</span>
              </div>
              <div className={'pull-right'}>
                <span>商品合计：￥{parseFloat(this.state.cartTotalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className={'clearfix'}>
            <div className={style.priceDeal}>应付总额：<span>￥{parseFloat(this.state.cartTotalAmount).toFixed(2)}</span></div>
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
        <Dialog show={this.state.dialog} width={724} height={670}>
          <div className={style.dialog}>
            <div className={style.title}>选择就地址</div>
            <div className={style.dialog_content}>
              {
                this.state.addressList.map(addressItem => {
                  return <ChoseAddress key={addressItem.addressId} address={addressItem} getAddressId={
                    (addressId) => {
                      this.choseAddress(addressId)
                    }
                  }/>
                })
              }
            </div>
            <div className={multStyle(style.dialog_opt, 'clearfix')}>
              <Button className={multStyle('pull-left', style.btn)} type={'secondary'} onClick={() => {
                let addressList = this.state.addressList
                for (let i in addressList) {
                  if (addressList[i].isChecked) {
                    addressList[i].isChosed = true
                    this.setState({
                      address:addressList[i]
                    })
                  } else {
                    addressList[i].isChosed = false
                  }
                }
                this.setState({ dialog: false })
              }}>确定</Button>
              <Button className={multStyle('pull-right', style.btn)} onClick={() => {
                let addressList = this.state.addressList
                for (let i in addressList) {
                  if (addressList[i].isChosed) {
                    addressList[i].isChecked = true
                    this.setState({
                      address:addressList[i]
                    })
                  } else {
                    addressList[i].isChecked = false
                  }
                }
                this.setState({ dialog: false })
              }}>取消</Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
export default withIndexTemplate(Balance)
