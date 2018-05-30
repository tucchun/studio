import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input, Button } from '../../components/form'
import { OrdersItem, OrderPrd } from '../../components/ordersItem'
import Pagination from '../../components/pagination'
import style from './style.scss'
import { updateBreadList } from '../../store/actions'
import {
  fetchOrderList,
  doInputChange,
  clickOrderStatus,
  pageTurn
} from '../../store/order/actions'
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
    this.doPagination = this.doPagination.bind(this)
  }

  componentWillMount () {
  }

  componentDidMount () {
    const { dispatch, orderLst } = this.props
    dispatch(updateBreadList([
      { name: '首页', href: '/' },
      { name: '订单管理' }
    ]))
    dispatch(fetchOrderList(orderLst.searchData))
  }

  doPagination ({pageNo}) { // 分页点击事件
    let { dispatch } = this.props
    dispatch(pageTurn(pageNo - 1))
  }

  doSearch () {
    let { dispatch, orderLst } = this.props
    dispatch(fetchOrderList(orderLst.searchData))
  }

  // 输入框 输入事件
  // 绑定数据
  doInputChange (result) {
    this.props.dispatch(doInputChange(result))
  }

  doClickOrderInfo (orderId) {
    this.props.history.push('/pages/ordersinfo/' + orderId)
  }

  changeStartDate = (result) => {
    this.props.dispatch(doInputChange({
      name: 'startTime',
      value: result.valueOf()
    }))
  }
  changeEndDate = (result) => {
    console.log(result)
    this.props.dispatch(doInputChange({
      name: 'endTime',
      value: result.valueOf()
    }))
  }

  renderStatusItem = (code, txt, dispatch) => {
    const { orderLst } = this.props
    const searchData = orderLst.searchData
    return (
      <li onClick={() => {
        let searchData = {
          ...orderLst.searchData,
          orderStatus: code
        }
        dispatch(clickOrderStatus(code))
        dispatch(fetchOrderList(searchData))
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
            {this.renderStatusItem('', '全部订单', dispatch)}
            {this.renderStatusItem('00', '待确认', dispatch)}
            {this.renderStatusItem('20', '待收货', dispatch)}
            {this.renderStatusItem('30', '已完成', dispatch)}
            {this.renderStatusItem('99', '已关闭', dispatch)}
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
                readOnly
                viewDate={(() => {
                  let date = moment()
                  date.hours(23)
                  date.minutes(59)
                  date.seconds(59)
                  return date
                })()}
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
        <Pagination
          currentPage={orderLst.searchData.pageNo + 1}
          totalCount={Number(orderLst.total)}
          handleClick={this.doPagination}
          pageSize={orderLst.searchData.pageSize} />
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
