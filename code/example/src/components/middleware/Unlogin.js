import React, { Component } from 'react'
import style from './style.scss'
import { Button } from '../form'
import { Link } from 'react-router-dom'
export default class Unlogin extends Component {
  render () {
    return (
      <React.Fragment>
        <div className={style.unlogin}>
          <Link to={{
            pathname: '/login',
            hash: '#'
          }}>
            <Button size='normal' className={style.login} type='primary'>登录</Button>
          </Link>
        </div>
      </React.Fragment>
    )
  }
}
