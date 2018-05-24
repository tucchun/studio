import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { multStyle } from '../../utils/common'
// import CommonStyle from '../../assets/style/common.scss'
import { Button, FormSearch } from '../form'
import ajax from '../../utils/ajax'
import style from './style.scss'
import Logo from '../../assets/icon/images/logo.png'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cartNums: undefined,
      collectNums: undefined,
      formInput: ''
    }
    this.onSearch = this.search.bind(this)
  }
  search (val) {
    location.href = `/#/prdList/?q=${val}`
  }

  componentDidMount () {
    ajax({
      url: '/los/2b-admin-front.getCartNum'
    }).then(res => {
      if (res && res.totalProduct) {
        this.setState({
          cartNums: res.totalProduct
        })
      }
    })
    ajax({
      url: '/los/2b-admin-front.queryCustFavoriteList'
    }).then(res => {
      if (res && res.favoriteList) {
        this.setState({
          collectNums: res.favoriteList.length
        })
      }
    })
  }

  render (props) {
    const { cartNums, collectNums } = this.state
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
              pathname: '/shopcart',
              hash: '#'
            }}>
              <Button
                icon='icon-cart'
                className={multStyle(style['w40'], style['btncart'])}
                tip={cartNums} >
                购物车
              </Button>
            </Link>
            <Link to={{
              pathname: '/collect',
              // search: '?sort=name',
              hash: '#'
              // state: { fromDashboard: true }
            }}>
              <Button
                icon='icon-collect'
                className={style['w40']}
                tip={collectNums}>
                我的收藏夹
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  HeaderNums: PropTypes.shape({
    cartNums: PropTypes.number,
    collectNums: PropTypes.number
  })
}
