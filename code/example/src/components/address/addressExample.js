import React, { Component } from 'react'
import { Address, ChoseAddress, EditorAddress } from './index'
class AddressExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addressList:[
        {
          addressId:1,
          addressName:'邓波',
          addressPhone:'138****2211',
          addressLocation:'广东省深圳市罗湖区梨园路6号物资置地大厦 13楼',
          addressZipcode:'518055',
          isDefalut:true,
          isChosed:true
        },
        {
          addressId:2,
          addressName:'涂传春',
          addressPhone:'138****2211',
          addressLocation:'广东省深圳市罗湖区梨园路6号物资置地大厦 13楼',
          addressZipcode:'518055',
          isDefalut:false,
          isChosed:false
        },
        {
          addressId:3,
          addressName:'李小龙',
          addressPhone:'138****2211',
          addressLocation:'广东省深圳市罗湖区梨园路6号物资置地大厦 13楼',
          addressZipcode:'518055',
          isDefalut:false,
          isChosed:false
        }
      ]
    }
  }
  render () {
    return (
      <div>
        <Address />
        {
          this.state.addressList.map(addressItem => {
            return <ChoseAddress key={addressItem.addressId} address={addressItem} />
          })
        }
        <EditorAddress />
      </div>
    )
  }
}
export default AddressExample
