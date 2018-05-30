import React, { Component } from 'react'
import style from './style.scss'
import { multStyle } from '../../utils/common'
import Button from '../form/button/Button'
import PropTypes from 'prop-types'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true,
      address: props.address,
      addressString:''
    }
  }

  componentWillReceiveProps (nextProps) {
    let address = nextProps.address
    let addressString = address.recipientProvince + '' +
      address.recipientCity + address.recipientCountry + '' +
      address.recipientAddress
    this.setState({
      show: nextProps.show,
      address:nextProps.address,
      addressString
    })
  }

  render () {
    return (
      <div className={multStyle(style.wrap_address, this.state.show ? style.show : style.hidden)}>
        <div className={style.address}>
          <div className={multStyle(style.address_tag, 'clearfix')}>
            <div className={'pull-left'}>
              <span className={this.state.address.flag === 'Y' ? '' : style.hidden}>
                <span className={multStyle(style.icon, style['icon-location'])}>&nbsp;</span>
                默认地址
              </span>
              <Button size={'small'} onClick={
                () => {
                  this.props.modify()
                }
              }>修改</Button>
            </div>
            <div className={'pull-right'}>
              <div className={style.addressOpt}>
                <a href='javascript:void(0)' onClick={
                  () => {
                    this.props.change()
                  }
                }>切换地址</a>
                <a href='javascript:void(0)' onClick={
                  () => {
                    this.props.new()
                  }
                }>新增地址</a>
              </div>
            </div>
          </div>
          <div className={style.address_content}>
            <div className={'clearfix'}>
              <p className={multStyle('pull-left', style.address_width)}>收货人：</p>
              <p className={multStyle('pull-left', style.address_name)}>{this.state.address.recipientName}</p>
              <p className={multStyle('pull-left', style.address_width)}>手机号码：</p>
              <p className={multStyle('pull-left', style.address_name)}>{this.state.address.recipientPhone}</p>
            </div>
            <div className={'clearfix'}>
              <p className={multStyle('pull-left', style.address_width)}>收货地址：</p>
              <p className={multStyle('pull-left', style.address_location)}>{
                this.state.addressString
              }</p>
              <p className={multStyle('pull-left', style.address_width)}>邮政编码：</p>
              <p className={multStyle('pull-left', style.address_name)}>{this.state.address.postCode}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Index.propTypes = {
  show: PropTypes.bool.isRequired,
  new: PropTypes.func.isRequired,
  modify: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired
}
