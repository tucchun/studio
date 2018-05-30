import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { multStyle } from '../../utils/common'
import { Button, FormSearch } from '../form'
import style from './style.scss'
import Logo from '../../assets/icon/images/logo.png'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cartNums: undefined,
      formInput: ''
    }
    this.search = this.search.bind(this)
  }
  search (val) {
    this.props.onSearch(val)
  }

  componentDidMount () {
  }

  render (props) {
    const { cartNums } = this.props
    return (
      <div className={style.header}>
        <div className={style.content}>
          <Link to={{
            pathname: '/',
            hash: '#'
          }}>
            <img className={style.logo} src={Logo} />
          </Link>
          <div className={style.operate}>
            <FormSearch
              onChange={({ value, name }) => { this.setState({ formInput: value }) }}
              value={this.state.formInput} onSearch={this.search}
            />
            <Link to={{
              pathname: '/pages/shopcart',
              hash: '#'
            }}>
              <Button
                icon='icon-cart'
                className={multStyle(style['w40'], style['btncart'])}
                tip={cartNums || ''} >
                购物车
              </Button>
            </Link>
            <Link to={{
              pathname: '/pages/collect',
              // search: '?sort=name',
              hash: '#'
              // state: { fromDashboard: true }
            }}>
              <Button
                icon='icon-collect'
                className={style['w40']}
              >
                我的收藏夹
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  cartNums: PropTypes.number,
  onSearch: PropTypes.func
}
