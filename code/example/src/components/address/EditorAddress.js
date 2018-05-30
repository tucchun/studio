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
      district:{},
      recipientAddress: '',
      postCode: '',
      recipientName: '',
      recipientPhone: '',
      recipientFxPhone: '',
      flag: '',
      checkState: false,
      show: false,
      isUpdate:true
    }
    this.getInputValue = this.getInputValue.bind(this)
    this.district = this.district.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    let isUpdate = nextProps.isUpdate
    let checkState = nextProps.address.flag === 'Y' ? true : false
    let address = {}
    if (isUpdate === false) {
      address = {
        addressId:'',
        flag:'N',
        isChecked:true,
        isChosed:true,
        isDefault:true,
        postCode:'',
        recipientAddress:'',
        recipientCity:'市辖区',
        recipientCountry:'东城区',
        recipientName:'',
        recipientPhone:'',
        recipientProvince:'北京'
      }
    } else {
      address = nextProps.address
    }
    this.setState({
      ...address,
      show:nextProps.show,
      checkState,
      isUpdate
    })
  }

  district () {
    let recipientProvince = this.state.recipientProvince
    let recipientCity = this.state.recipientCity
    let recipientCountry = this.state.recipientCountry
    return {
      recipientProvince, recipientCity, recipientCountry
    }
  }

  getInputValue (obj) {
    let name = obj.name
    let value = obj.value
    let objMsg = {}
    let checkState = this.state.checkState
    if (name === 'flag') {
      checkState = !this.state.checkState
      objMsg[name] = checkState ? 'Y' : 'N'
    } else {
      objMsg[name] = value
    }
    this.setState({
      checkState,
      ...objMsg
    })
  }

  render () {
    return (
      <div className={multStyle(style.editor_address, this.state.show ? style.show : style.hidden)}>
        <div className={style.wrap_content}>
          <div className={style.form}>
            <div className={style.row}>
              <div className={style.label}>所在地区：</div>
              <div className={style.wrap_input}>
                <Cascade getDistrict={
                  (district) => {
                    console.log(district)
                    this.setState({
                      ...this.state,
                      ...district
                    })
                  }
                } district={
                  this.district()
                } />
              </div>
            </div>
            <div className={style.row}>
              <div className={style.label}>详细地址：</div>
              <div className={style.wrap_input}><textarea name={'recipientAddress'} onChange={
                (event) => {
                  let objVaule = { value: event.target.value, name: event.target.name }
                  this.getInputValue(objVaule)
                }
              } value={this.state.recipientAddress} /></div>
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
                } />
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
  cancel: PropTypes.func.isRequired,
  isUpdate:PropTypes.bool.isRequired
}
