import React, { Component } from 'react'
import { Button } from '../../components/form/index'
import style from './style.scss'
import Breadcrumb from '../../components/breadcrumb/index'
import Template from '../template'
import { multStyle } from '../../utils/common'
import { Link } from 'react-router-dom'
export default class OrderResult extends Component {
  constructor (props) {
    super(props)
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
      ]
    }
  }
  render () {
    let success = false, cls = 'icon_success', orderInfo = '', ops = ''
    cls = success ? cls : 'icon_fail'
    if (success) {
      orderInfo =
        <div>
          <p className={style.tipsMsg}>您的订单提交成功!</p>
          <p>订单编号：<span>20180504092600184</span></p>
          <p className={style.orderPrice}>订单总价：<span>￥124.00</span></p>
        </div>
      ops =
        <div className={multStyle('clearfix', style.mt80)}>
          <Button className={'pull-left'}>查看我的订单</Button>
          <Button className={'pull-right'}>返回首页</Button>
        </div>
    } else {
      orderInfo =
        <div>
          <p className={style.tipsMsg}>您的订单提交失败!</p>
        </div>
      ops =
        <div className={multStyle('clearfix', style.mt80)}>
          <Link to={'/shopcart'} className={'pull-left'}><Button>重新提交</Button></Link>
          <Link to={'/shopcart'} className={'pull-right'}><Button>返回购物车</Button></Link>
        </div>
    }
    return (
      <Template>
        <Breadcrumb breads={this.state.breadList} />
        <div className={style.orderResult}>
          <div>
            <i className={multStyle(style['icon-biger'], style[cls])}>&nbsp;</i>
          </div>
          {orderInfo}
          {ops}
        </div>
      </Template>
    )
  }
}
