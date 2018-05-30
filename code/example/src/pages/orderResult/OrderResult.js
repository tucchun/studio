import React, { Component } from 'react'
import { Button } from '../../components/form/index'
import style from './style.scss'
import { multStyle } from '../../utils/common'
import { updateBreadList } from '../../store/actions'
import * as OrderResultAction from '../../store/orderResult/actions'
import { Link } from 'react-router-dom'
import Text from '../../components/form/Text'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class OrderResult extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    const { dispatch, balanceData } = this.props
    let OrderMsg = balanceData.orderMsg || {}
    dispatch(updateBreadList([
      { name: '首页', href: '/' },
      { name: '订单提交结果', href: './orderResult' }
    ]))
    dispatch(OrderResultAction.getOrderMsg(OrderMsg))
    console.log('componentDidMount')
  }

  render () {
    let msg = this.props.balanceData.orderMsg
    let success = msg.orderNo ? true : false
    let cls = 'icon_success'
    let orderInfo = ''
    let ops = ''
    cls = success ? cls : 'icon_fail'
    if (success) {
      orderInfo =
        <div>
          <p className={style.tipsMsg}>您的订单提交成功!</p>
          <p>订单编号：<span>{msg.orderNo}</span></p>
          <p className={style.orderPrice}>订单总价：<span>￥<Text type={'price'}>{msg.orderPriceAmount}</Text></span></p>
        </div>
      ops =
        <div className={multStyle('clearfix', style.mt80)}>
          <Link to={'/pages/orders'} className={'pull-left'}><Button className={'pull-left'}>查看我的订单</Button></Link>
          <Link to={'/'}><Button className={'pull-right'}>返回首页</Button></Link>
        </div>
    } else {
      orderInfo =
        <div>
          <p className={style.tipsMsg}>您的订单提交失败!</p>
        </div>
      ops =
        <div className={multStyle('clearfix', style.mt80)}>
          <Link to={'/pages/shopcart'} className={'pull-left'}><Button>重新提交</Button></Link>
          <Link to={'/pages/shopcart'} className={'pull-right'}><Button>返回购物车</Button></Link>
        </div>
    }
    return (
      <div>
        <div className={style.orderResult}>
          <div>
            <i className={multStyle(style['icon-biger'], style[cls])}>&nbsp;</i>
          </div>
          {orderInfo}
          {ops}
        </div>
      </div>
    )
  }
}

OrderResult.propTypes = {
  dispatch:PropTypes.func,
  balanceData: PropTypes.object
}

const mapStateToProps = state => {
  return {
    orderResultData:state.orderResultData,
    balanceData:state.balanceData
  }
}
export default connect(
  mapStateToProps
)(OrderResult)
