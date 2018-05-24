import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../form'
import style from './style.scss'
import ImageOfNot from './images/404.png'

export default class NotFind extends React.Component {
  constructor (props) {
    super(props)
    this.doClick = this.doClick.bind(this)
  }

  doClick (e) {
    this.props.onClick(e)
  }

  static defaultProps = {
    onClick: function () {}
  }

  render () {
    return (
      <div className={style['notFind-wrapper']}>
        <div className={style.notfindImgWrapper}>
          <img src={ImageOfNot} className={style.img} />
        </div>
        <div className={style.notfindTip}>
          <p>对不起，您访问的页面不存在。</p>
        </div>
        <div className={style.notfindBack}>
          <Button onClick={this.doClick}>返回首页</Button>
        </div>
      </div>
    )
  }
}

NotFind.propTypes = {
  onClick: PropTypes.func
}
