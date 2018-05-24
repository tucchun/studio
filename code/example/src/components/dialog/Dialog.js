import React from 'react'
import PropTypes from 'prop-types'
import { multStyle } from '../../utils/common'
// import commonStyle from '../../assets/style/common.scss'
import style from './style.scss'

export default class Dialog extends React.Component {
  static defaultProps = {
    width: 450,
    height: 450,
    show: true,
    mask: true
  }

  render () {
    // 位子居中
    let dialogStyle = {}
    dialogStyle.width = this.props.width + 'px'
    dialogStyle.height = this.props.height + 'px'
    dialogStyle.marginTop = '-' + (this.props.height / 2) + 'px'

    return (
      <div className={this.props.show ? style.dialog : 'hidden'} >
        <div className={multStyle(style['dialog-inner'])} style={dialogStyle}>
          {this.props.children}
        </div>
        {this.props.mask ? (<div className={style.bg} />) : null}
      </div>
    )
  }
}

Dialog.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  show: PropTypes.bool,
  mask: PropTypes.bool,
  children: PropTypes.any
}
