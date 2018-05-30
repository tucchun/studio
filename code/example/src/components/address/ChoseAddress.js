import React, { Component } from 'react'
import { multStyle } from '../../utils/common'
import style from './style.scss'
import PropTypes from 'prop-types'
export default class ChoseAddress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address:props.address
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      address:nextProps.address
    })
  }

  getDefalutTag (isDefault) {
    if (!isDefault) return null
    return (
      <div className={multStyle(style.address_tag, 'clearfix')}>
        <span>
          <span className={multStyle(style.icon, style['icon-location'])}>&nbsp;</span>
          默认地址
        </span>
      </div>
    )
  }
  render () {
    let addressItem = this.state.address
    let active = addressItem.isChecked ? style.active : ''
    return (
      <div className={multStyle(style.wrap_address, style.address_item, active)} onClick={
        () => {
          this.props.getAddressId(addressItem.addressId)
        }
      }>
        <div className={style.address}>
          {
            this.getDefalutTag(addressItem.isDefault)
          }
          <div className={style.address_content}>
            <table cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td>收货人：</td>
                  <td>{addressItem.recipientName}</td>
                  <td>手机号码：</td>
                  <td>{addressItem.recipientPhone}</td>
                </tr>
                <tr>
                  <td>收货地址：</td>
                  <td colSpan={3}>{
                    addressItem.recipientProvince + addressItem.recipientCity +
                    addressItem.recipientCountry + addressItem.recipientAddress}</td>
                </tr>
                <tr>
                  <td>邮政编码：</td>
                  <td>{addressItem.postCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
ChoseAddress.propTypes = {
  address:PropTypes.object.isRequired,
  getAddressId:PropTypes.func.isRequired
}
