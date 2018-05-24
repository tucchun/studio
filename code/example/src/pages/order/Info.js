import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumb from '../../components/breadcrumb'
import { Process, Describe } from '../../components/ordersItem'
import { GoodsTable } from '../../components/goodsItem'
import { withTemplate } from '../template'
import ajax from '../../utils/ajax'
import { connect } from 'react-redux'

export class OrderInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      HeaderNums: {
        cartNums: 10,
        collectNums: 10
      },
      breadList: [
        { name: '首页', href: '/' },
        { name: '订单管理', href: '/orders' }
      ],
      choseGoods: [
        {
          productCode: 1,
          productPrice: 123.11,
          productImageUrl: 'http://img1.imgtn.bdimg.com/it/u=594559231,2167829292&fm=27&gp=0.jpg',
          productName: '惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          spec: '白色',
          count: 2
        },
        {
          productCode: 2,
          productPrice: 123.11,
          productImageUrl: 'http://img1.imgtn.bdimg.com/it/u=594559231,2167829292&fm=27&gp=0.jpg',
          productName: '惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          spec: '白色',
          count: 3
        },
        {
          productCode: 3,
          productPrice: 123.11,
          productImageUrl: 'http://img1.imgtn.bdimg.com/it/u=594559231,2167829292&fm=27&gp=0.jpg',
          productName: '惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          spec: '白色',
          count: 1
        }
      ]
    }
  }

  componentDidMount () {
    let { orderId } = this.props.match.params
    ajax({
      url: '/los//2b-admin-front.queryOrderDetils',
      data: {
        orderNo: orderId
      }
    }).then(res => {
      console.log(JSON.stringify(res))
      console.log(res)
    })
  }

  static propTypes = {
    match: PropTypes.any
  }

  render () {
    return (
      <React.Fragment>
        <Breadcrumb breads={this.state.breadList} />
        <Process />
        <Describe />
        <GoodsTable goodsList={this.state.choseGoods} />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    header: state.collects
  }
}
export default connect(
  mapStateToProps
)(OrderInfo)

// export default withTemplate(OrderInfo)
