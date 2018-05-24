import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'
import Input from '../input/Input'
import style from './style.scss'

export default class FormSearch extends Component {
  constructor (props) {
    super(props)
    this.doClick = this.doClick.bind(this)
    this.doInputChange = this.doInputChange.bind(this)
  }

  static defaultProps = {
    onSearch: function () {},
    placeholder: '请输入关键字进行搜索'
  }

  doClick (e) {
    this.props.onSearch(this.props.value)
  }

  doInputChange ({ value }) {
    this.props.onChange({
      value,
      name: this.props.name
    })
  }

  render () {
    return (
      <div className={style.search}>
        <Input
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.doInputChange}
          className={style.input}
        />
        <Button type='secondary' onClick={this.doClick} className={style.btn}>搜索</Button>
      </div>
    )
  }
}

FormSearch.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func
}
