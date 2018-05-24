import React, { Component } from 'react'
import { Button, FormSearch, Input, Select, Checkbox } from './index'
import style from './style.scss'

let Option = Select.Option
export default class ButtonExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchValue: '',
      inputValue: '',
      groupValue: [],
      checked_1: false,
      selectValue: '11'
    }
  }

  render () {
    return (
      <div className={style.cnt} style={{ 'padding':'10px' }}>
        <p>
          <Button size='normal' className={style.login} type='primary'>登录</Button>
        </p>
        <p>
          <Button size='large' className={style['add-cart']} type='secondary'>加入购物车</Button>
        </p>
        <p>
          <Button className={style['add-collect']} icon='icon-start-collect-1'>加入收藏夹</Button>
        </p>
        <p>
          <Button className={style['add-collect']} type='m-1' icon='icon-start-collect'>已收藏</Button>
        </p>
        <div>
          <FormSearch value={this.state.searchValue} onChange={value => {
            this.setState({ searchValue: value })
            console.log(value)
          }} />
        </div>
        <p>
          <Button icon='icon-cart' tip={20} >购物车</Button>
        </p>
        <p>
          <Button icon='icon-collect' >我的收藏夹</Button>
        </p>
        <p>
          <Button icon='icon-order' className={style['w40']} type='primary' >订单管理</Button>
        </p>
        <p>
          <Button icon='icon-sign-out' className={style['w40']} type='primary' >退出</Button>
        </p>
        <p>
          <Button size='large' type='secondary'>下单</Button>
        </p>
        <p>
          <Button size='small'>修改</Button>
        </p>
        <p>
          <Button icon='icon-back'>返回购物车</Button>
        </p>
        <p>
          <Button type='secondary'>保存收货信息</Button>
        </p>
        <p>
          <Button className={style['w160']}>取消</Button>
        </p>
        <p>
          <Button size='small' type='m-2'>确定</Button>
        </p>
        <p>
          <Button size='small' type='m-3'>确认收货</Button>
        </p>
        <p>
          <Button type='m-3'>确认收货</Button>
        </p>
        <div>
          <Input value={this.state.inputValue} onChange={({ value, name }) => {
            this.setState({ inputValue: value })
            console.log(value, name)
          }} />
        </div>
        <p>
          <Button onClick={() => {
            this.setState({
              selectValue: this.state.selectValue === '11' ? '22' : '11'
            })
          }} size='smaller' icon='icon-delete' type='m-4'>改变select值</Button>
        </p>
        <div>
          <Select name='selectname' className={style.m20} selectValue={this.state.selectValue} onChange={(value) => { this.setState({ selectValue: value.value }) }}>
            <Option value='11'>--11</Option>
            <Option value='22'>--22</Option>
            <Option value='33'>--33</Option>
            <Option value='44'>--44</Option>
            <Option value='55'>--55</Option>
          </Select>
        </div>
        <div>
          <Checkbox checked={this.state.checked_1} value={111} onChange={res => {
            this.setState({ checked_1: !this.state.checked_1 })
            console.log(res)
          }}>label</Checkbox>
        </div>
        <div>
          <Checkbox.Group value={this.state.groupValue} onChange={value => {
            this.setState({ groupValue: value })
            console.log(value)
          }}>
            <Checkbox value={111}>111</Checkbox>
            <Checkbox value={222}>222</Checkbox>
            <Checkbox value={333}>333</Checkbox>
            <Checkbox value={444}>444</Checkbox>
          </Checkbox.Group>
        </div>
      </div>
    )
  }
}
