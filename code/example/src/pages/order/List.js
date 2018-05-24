import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Breadcrumb from '../../components/breadcrumb'
import { Input, Button } from '../../components/form'
import { OrdersItem, OrderPrd } from '../../components/ordersItem'
import style from './style.scss'
import { setCollect } from '../../actions'
import ajax from '../../utils/ajax'
import 'react-datetime/css/react-datetime.css'
import DateTime from 'react-datetime'
// var moment = require('moment')
require('moment/locale/zh-cn')

export class OrderList extends React.Component {
  constructor (props) {
    super(props)
    this.doClickOrderInfo = this.doClickOrderInfo.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.state = {
      breadList: [
        { name: '首页', href: '/' },
        { name: '订单管理', href: '/orders' }
      ],
      lstData: {
        girdData: [],
        pageNumber: 1,
        currentPage: 1,
        total: 0,
        search_data: {
          startDate: undefined,
          endDate: undefined,
          begin: 0,
          count: 10
        }
      }
    }
    console.log('constructor')
  }

  componentWillMount () {
    console.log('componentWillMount')
  }

  componentDidMount () {
    this.fetchData()
    console.log('componentDidMount')
  }

  doSearch () {
    this.props.dispatch(setCollect({
      cartNums: 20,
      collectNums: 20
    }))
  }

  doClickOrderInfo (orderId) {
    this.props.history.push('/ordersinfo/' + orderId)
  }

  fetchData = () => {
    return ajax({
      url: '/los/2b-admin-front.getOrderShopList',
      data: {
        endTime: '',
        orderNo: '',
        orderStatus: '',
        pageNo: 1,
        pageSize: 5,
        recipientName: '',
        startTime: ''
      }
    }).then(reuslt => {
      console.log(reuslt)
      this.setState({
        lstData: {
          ...this.state.lstData,
          girdData: reuslt.orderList
        }
      })
    })
  }

  changeStartDate = (result) => {
    this.setState({
      lstData: {
        ...this.state.lstData,
        search_data: {
          ...this.state.lstData.search_data,
          startDate: result
        }
      }
    })
  }
  changeEndDate = (result) => {
    console.log(result)
    // this.setState({
    //   lstData: {
    //     ...this.state.lstData,
    //     search_data: {
    //       ...this.state.lstData.search_data,
    //       endDate: result
    //     }
    //   }
    // })
  }

  render () {
    debugger
    console.log(this.props.header)
    console.log(this.state.lstData.girdData)
    return (
      <React.Fragment>
        <Breadcrumb breads={this.state.breadList} />
        <div>
          <ul className={style.orderState}>
            <li className={style.active}>全部订单</li>
            <li>待确认</li>
            <li>待收货</li>
            <li>已完成</li>
            <li>已关闭</li>
          </ul>
        </div>
        <div className={style.condition}>
          <label>
            订单编号：<Input />
          </label>
          <label>
            收货人姓名：<Input />
          </label>
          <label>
            联系电话：<Input />
          </label>
          <div className={style.label}>
            下单时间：
            <div className={style.pickdate}>
              <DateTime
                locale='zh-cn'
                defaultValue={this.state.lstData.search_data.startDate}
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
                defaultValue={this.state.lstData.search_data.endDate}
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
          (this.state.lstData.girdData || []).map(item => {
            return (
              <OrdersItem
                {...item}
                key={item.orderId}
                className={style.ordersItem}
                onClickOrderInfo={this.doClickOrderInfo}>
                {
                  (item.orderShopItems || []).map(shopItem => {
                    return (<OrderPrd {...shopItem} />)
                  })
                }
              </OrdersItem>
            )
          })
        }
        {/* <OrdersItem className={style.ordersItem} onClickOrderInfo={this.doClickOrderInfo}>
          <OrderPrd />
        </OrdersItem>
        <OrdersItem className={style.ordersItem} onClickOrderInfo={this.doClickOrderInfo}>
          <OrderPrd />
          <OrderPrd />
        </OrdersItem>
        <OrdersItem className={style.ordersItem} onClickOrderInfo={this.doClickOrderInfo}>
          <OrderPrd />
        </OrdersItem>
        <OrdersItem className={style.ordersItem} onClickOrderInfo={this.doClickOrderInfo}>
          <OrderPrd />
        </OrdersItem> */}
      </React.Fragment>
    )
  }
}

OrderList.propTypes = {
  history: PropTypes.any,
  context: PropTypes.any,
  toggleHeaderNumber: PropTypes.func,
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    header: state.collects
  }
}
export default connect(
  mapStateToProps
)(OrderList)
// export default connect()(OrderList)

