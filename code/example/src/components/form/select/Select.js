import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { multStyle } from '../../../utils/common'
// import commonStyle from '../../../assets/style/common.scss'
import style from './style.scss'

class Select extends Component {
  constructor (props) {
    super(props)
    this.clickSelect = this.clickSelect.bind(this)
    this.toggleOption = this.toggleOption.bind(this)
    this.clickDocument = this.clickDocument.bind(this)
    this.optionsData = {} // options value {key:value, key2: value2}
    this.state = {
      show: false,
      init: false
    }
  }

  // 获取默认text
  getTextByValue () {
    let selectValue = this.props.selectValue
    return this.optionsData[selectValue] || ''
  }

  getChildContext () {
    return {
      select: {
        toggleOption: this.toggleOption,
        optionsData: this.optionsData
      }
    }
  }

  toggleOption ({ value, text }) {
    this.props.onChange({ value, name: this.props.name })
  }

  static defaultProps = {
    onChange: function () {}
  }

  // 点击select
  clickSelect (e) {
    this.setState({
      show: !this.state.show
    })
    // 阻止事件冒泡
    e.nativeEvent.stopImmediatePropagation()
  }

  clickDocument (e) {
    this.setState({
      show: false
    })
  }

  componentDidMount () {
    if (this.props.selectValue) {
      this.setState({ init: true })
    }
    document.addEventListener('click', this.clickDocument)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.clickDocument)
  }

  render () {
    let showStyle = ''
    if (this.state.show) {
      showStyle = multStyle(style['select-list'])
    } else {
      showStyle = multStyle(style['select-list'], 'hidden')
    }
    return (
      <div className={multStyle(style['select-wrapper'], this.props.className)} onClick={this.clickSelect}>
        <div className={style['select-inner']}>
          <div className={style['select-value']}>
            {this.getTextByValue()}
          </div>
          <i className={style.icon} />
          <ul className={showStyle}>
            {this.props.children}
          </ul>
        </div>
      </div>
    )
  }
}

Select.propTypes = {
  selectValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.array
}

Select.childContextTypes = {
  select: PropTypes.any
}

export default Select
