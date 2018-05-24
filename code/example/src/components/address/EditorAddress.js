import React, { Component } from 'react'
import Cascade from './addressCascade/Cascade'
import style from './style.scss'
import { Input, Checkbox, Button } from '../form/index'
import { multStyle } from '../../utils/common'
import PropTypes from 'prop-types'

export default class EditorAddress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      district: {},
      recipientAddress: '',
      postCode: '',
      recipientName: '',
      recipientPhone: '',
      recipientFxPhone: '',
      flag: 'Y',
      checkState: false,
      show: false
    }
    this.getInputValue = this.getInputValue.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      show: nextProps.show
    })
  }

  getInputValue (obj) {
    let name = obj.name, value = obj.value, objMsg = {}, checkState = !this.state.checkState
    objMsg[name] = value
    if (!checkState) objMsg[name] = 'N'
    if (name === 'flag') {
      this.setState({
        ...this.state,
        ...objMsg,
        checkState
      })
    } else {
      this.setState({
        ...this.state,
        ...objMsg
      })
    }
  }

  render () {
    return (
      <div className={multStyle(style.editor_address, this.state.show ? style.show : style.hidden)}>
        <div className={style.wrap_content}>
          <div className={style.form}>
            <div className={style.row}>
              <div className={style.label}>所在地区：</div>
              <div className={style.wrap_input}><Cascade getDistrict={
                (district) => {
                  this.setState({
                    ...this.state,
                    district
                  })
                }
              }/></div>
            </div>
            <div className={style.row}>
              <div className={style.label}>详细地址：</div>
              <div className={style.wrap_input}><textarea name={'recipientAddress'} onChange={
                (event) => {
                  let objVaule = { value: event.target.value, name: event.target.name }
                  this.getInputValue(objVaule)
                }
              }/></div>
            </div>
            <div className={style.row}>
              <div className={style.label}>邮政编码：</div>
              <div className={style.wrap_input}><Input name={'postCode'} value={this.state.postCode} onChange={
                (obj) => {
                  this.getInputValue(obj)
                }
              }/></div>
            </div>
            <div className={style.row}>
              <div className={style.label}>收货人：</div>
              <div className={style.wrap_input}>
                <Input name={'recipientName'} value={this.state.recipientName} onChange={
                  obj => {
                    this.getInputValue(obj)
                  }
                }/></div>
            </div>
            <div className={style.row}>
              <div className={style.label}>手机号码：</div>
              <div className={multStyle(style.wrap_input, style.mr_100)}>
                <Input name={'recipientPhone'} value={this.state.recipientPhone} onChange={
                  obj => {
                    this.getInputValue(obj)
                  }
                }/>
              </div>
              <div className={style.label}>固定电话：</div>
              <div className={style.wrap_input}>
                <Input name={'recipientFxPhone'} value={this.state.recipientFxPhone} onChange={
                  obj => {
                    this.getInputValue(obj)
                  }
                }/>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.label}>&nbsp;</div>
              <div className={style.wrap_input}>
                <Checkbox value={'Y'} checked={this.state.checkState} onChange={
                  (value) => {
                    let obj = { name: 'flag', value: value.value }
                    this.getInputValue(obj)
                  }
                }>设置为默认收货地址</Checkbox>
              </div>
            </div>
          </div>
        </div>
        <div className={style.form}>
          <div className={style.row}>
            <div className={style.label}>&nbsp;</div>
            <div className={style.wrap_input}>
              <Button className={style.mr_30} type={'secondary'} size={'normal'}
                      onClick={
                        () => {
                          let district = this.state
                          this.props.submit(district)
                        }
                      }
              >保存收货信息</Button>
              <Button size={'normal'} onClick={
                this.props.cancel
              }>取消</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
EditorAddress.propTypes = {
  show: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}
