import React from 'react'
import PropTypes from 'prop-types'
import { Process, Describe } from '../../components/ordersItem'
import { GoodsTable } from '../../components/goodsItem'
import { updateBreadList } from '../../store/actions'
import {
  fetchOrderInfo
} from '../../store/order/actions'
import { connect } from 'react-redux'

export class OrderInfo extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
  }

  componentDidMount () {
    let { match, dispatch } = this.props
    let { orderId } = match.params
    dispatch(updateBreadList([
      { name: '首页', href: '/' },
      { name: '订单管理', href: '/pages/orders' },
      { name: '订单详情' }
      // { name: '订单详情', href: `/pages/ordersinfo/${orderId}` }
    ]))
    dispatch(fetchOrderInfo({ orderNo: orderId }))
  }

  static propTypes = {
    match: PropTypes.any,
    ordersInfo: PropTypes.object,
    dispatch: PropTypes.func
  }

  render () {
    const { ordersInfo } = this.props
    let orderStatus = ordersInfo.orderStatus
    let step = 1
    if (orderStatus === '00') {
      step = 1
    } else if (orderStatus === '10') {
      step = 2
    } else {
      step = 3
    }
    let shopItems = (ordersInfo.orderShopItems || []).map((item) => {
      return {
        productPrice: item.unitPrice,
        productImageUrl: item.url,
        productName: item.productName,
        count: item.count,
        totalPrice: item.totalPrice
      }
    })
    return (
      <React.Fragment>
        <Process step={step} />
        <Describe {...ordersInfo} />
        <GoodsTable goodsList={shopItems} />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    ordersInfo: state.ordersInfo
  }
}
export default connect(
  mapStateToProps
)(OrderInfo)
