import React, { Component } from 'react'
import ShopCartItem from '../item/ShopCartItem'
import { Input } from '../../../components/form/index'
import style from './style.scss'
import { multStyle } from '../../../utils/common'
import PropTypes from 'prop-types'
export default class GoodsTable extends Component {
  constructor (props) {
    super(props)
    this.changeRemark = this.changeRemark.bind(this)
    this.state = {
      goodsList:props.goodsList,
      remark:''
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      goodsList:nextProps.goodsList
    })
  }

  changeRemark (obj) {
    this.setState({
      ...this.state,
      remark:obj.value
    })
    if (this.props.getRemark) {
      this.props.getRemark(this.state.remark)
    }
  }

  render () {
    return (
      <div className={style.wrap_item}>
        <div className={multStyle(style.title, 'clearfix')}>
          <div className={multStyle(style.goods_name, 'pull-left')}>商品信息</div>
          <div className={multStyle(style.w231, 'pull-left')}>单价</div>
          <div className={multStyle(style.w231, 'pull-left')}>数量</div>
          <div className={multStyle(style.w231, 'pull-left')}>小计</div>
        </div>
        <div className={style.item_container}>
          {
            this.state.goodsList.map(item => {
              return <ShopCartItem goods={item} key={item.productCode} />
            })
          }
        </div>
        <div className={style.remark}>
          <span>备注：</span>
          {this.props.remarkStatus === 'editor' ? <Input className={style.remark_input} onChange={
            this.changeRemark
          } name={'remark'} value={this.state.remark} placeholder={'可以说出您的要求'} /> : <span className={style.remark_text}>{this.state.remark}</span>}
        </div>
      </div>
    )
  }
}
GoodsTable.propTypes = {
  goodsList:PropTypes.array.isRequired,
  remarkStatus:PropTypes.oneOf(['editor', 'show']),
  getRemark:PropTypes.func
}
