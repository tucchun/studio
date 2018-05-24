import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { multStyle } from '../../../utils/common'
import style from './style.scss'

/**
 * button
 * size   large normaler normal small (height: 60px 48px 32px)
 * style  primary secondary default m-1 m-2 m-3 m-4
 * icon   图标
 */
export default class Button extends Component {
  constructor (props) {
    super(props)
    this.doClick = this.doClick.bind(this)
  }

  static defaultProps = {
    htmlType: 'button',
    disabled: false,
    onClick: function () {},
    className: '',
    size: 'normal',
    type: 'default',
    tip: undefined,
    icon: ''
  }

  doClick (e) {
    this.props.onClick(e)
  }

  render () {
    let { className, disabled, size, type } = this.props
    // 按钮样式
    let _styles = []
    _styles.push(style.btn)
    _styles.push(style[size])
    _styles.push(style[type])
    if (disabled) {
      _styles.push(style['disabled'])
    }
    _styles.push(className)
    return (
      <button
        disabled={disabled}
        className={_styles.join(' ')}
        type={this.props.htmlType}
        onClick={this.doClick}>
        {this.props.icon ? (<i className={multStyle(style.icon, style[this.props.icon])} />) : null }
        <i role='button-value' className={style['btn-txt']}>{this.props.children}</i>
        {
          this.props.tip === undefined ? null : (<span className={style.tipWrapp}><i className={style.tip}>{this.props.tip}</i></span>)
        }
      </button>
    )
  }
}

Button.propTypes = {
  htmlType: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  tip: PropTypes.number,
  icon: PropTypes.string
}
