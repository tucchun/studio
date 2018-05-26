import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input, Button } from '../../components/form'
import { OrdersItem, OrderPrd } from '../../components/ordersItem'
import style from './style.scss'
import { OrderAction, updateBreadList } from '../../store/actions'
import 'react-datetime/css/react-datetime.css'
import DateTime from 'react-datetime'
const moment = require('moment')
require('moment/locale/zh-cn')

export class OrderList extends React.Component {
  constructor (props) {
    super(props)
    this.doClickOrderInfo = this.doClickOrderInfo.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.doInputChange = this.doInputChange.bind(this)
    console.log('constructor')
  }

  componentWillMount () {
    console.log('componentWillMount')
  }

  componentDidMount () {
    const { dispatch, orderLst } = this.props
    dispatch(updateBreadList([
      { name: '首页', href: '/' },
      { name: '订单管理', href: '/pages/orders' }
    ]))
    dispatch(OrderAction.fetchOrderList(orderLst.searchData))
    console.log('componentDidMount')
  }

  doSearch () {
    let { dispatch, orderLst } = this.props
    dispatch(OrderAction.fetchOrderList(orderLst.searchData))
  }

  // 输入框 输入事件
  // 绑定数据
  doInputChange (result) {
    this.props.dispatch(OrderAction.doInputChange(result))
  }

  doClickOrderInfo (orderId) {
    this.props.history.push('/pages/ordersinfo/' + orderId)
  }

  changeStartDate = (result) => {
    this.props.dispatch(OrderAction.doInputChange({
      startTime: result.valueOf()
    }))
  }
  changeEndDate = (result) => {
    console.log(result)
    this.props.dispatch(OrderAction.doInputChange({
      endTime: result.valueOf()
    }))
  }

  renderStatusItem = (code, txt, dispatch, searchData) => {
    return (
      <li onClick={() => {
        dispatch(OrderAction.clickOrderStatus(code))
        dispatch(OrderAction.fetchOrderList(searchData))
      }} className={searchData.orderStatus === code ? style.active : ''}>{txt}</li>
    )
  }

  render () {
    const { dispatch, orderLst } = this.props
    let searchData = orderLst.searchData
    return (
      <React.Fragment>
        <div>
          <ul className={style.orderState}>
            {this.renderStatusItem('', '全部订单', dispatch, searchData)}
            {this.renderStatusItem('00', '待确认', dispatch, searchData)}
            {this.renderStatusItem('20', '待收货', dispatch, searchData)}
            {this.renderStatusItem('30', '已完成', dispatch, searchData)}
            {this.renderStatusItem('99', '已关闭', dispatch, searchData)}
          </ul>
        </div>
        <div className={style.condition}>
          <label>
            订单编号：<Input name='orderNo' onChange={this.doInputChange} value={searchData.orderNo} />
          </label>
          <label>
            收货人姓名：<Input name='recipientName' onChange={this.doInputChange} value={searchData.recipientName} />
          </label>
          <label>
            联系电话：<Input name='recipientPhone' onChange={this.doInputChange} value={searchData.recipientPhone} />
          </label>
          <div className={style.label}>
            下单时间：
            <div className={style.pickdate}>
              <DateTime
                locale='zh-cn'
                defaultValue={searchData.startTime ? moment(searchData.startTime) : ''}
                onChange={this.changeStartDate}
                viewMode={'days'}
                dateFormat={'YYYY-MM-DD'}
                timeFormat={'HH:mm:ss'}
                closeOnSelect
                inputProps={{
                  className: style.input
                }}
              />
            </div>
            <span>-</span>
            <div className={style.pickdate}>
              <DateTime
                locale='zh-cn'
                defaultValue={searchData.endTime ? moment(searchData.endTime) : ''}
                onChange={this.changeEndDate}
                viewMode={'days'}
                dateFormat={'YYYY-MM-DD'}
                timeFormat={'HH:mm:ss'}
                closeOnSelect
                inputProps={{
                  className: style.input
                }}
              />
            </div>
          </div>
          <label>
            <Button type='m-2' size='small' onClick={this.doSearch}>查询</Button>
          </label>
        </div>
        {
          (this.props.orderLst.girdData || []).map(item => {
            return (
              <OrdersItem
                {...item}
                key={item.orderId}
                className={style.ordersItem}
                onClickOrderInfo={this.doClickOrderInfo}>
                {
                  (item.orderShopItems || []).map((shopItem, i) => {
                    return (<OrderPrd key={i} {...shopItem} />)
                  })
                }
              </OrdersItem>
            )
          })
        }
        {/*
        <OrdersItem className={style.ordersItem} onClickOrderInfo={this.doClickOrderInfo}>
          <OrderPrd />
          <OrderPrd />
        </OrdersItem>
        */}
      </React.Fragment>
    )
  }
}

OrderList.propTypes = {
  history: PropTypes.any,
  context: PropTypes.any,
  orderLst: PropTypes.object,
  toggleHeaderNumber: PropTypes.func,
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    orderLst: state.orderLst
  }
}
export default connect(
  mapStateToProps
)(OrderList)
