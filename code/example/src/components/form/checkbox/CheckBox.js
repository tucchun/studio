import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { CheckboxGruopContext } from '../../context'
class Checkbox extends Component {
  constructor (props) {
    super(props)
    this.doClick = this.doClick.bind(this)
  }

  static defaultProps = {
    children: '',
    onChange: function () {}
  }

  doClick (e) {
    this.props.onChange({
      label: this.props.children,
      value: this.props.value
    })
  }

  render () {
    const checkboxGroup = this.props.checkboxGroup
    let checkboxProps = {}
    checkboxProps.checked = this.props.checked
    if (checkboxGroup.state) {
      this.doClick = () => checkboxGroup.toggleOption({
        label: this.props.children,
        value: this.props.value
      })
      checkboxProps.checked = checkboxGroup.value.indexOf(this.props.value) !== -1
    }
    return (
      <label className={style.wrapper} onClick={this.doClick}>
        <i className={style.checkbox}>
          {
            checkboxProps.checked ? (<i className={style.checked} />) : null
          }
        </i>
        {this.props.children ? (<span className={style.label}>{this.props.children}</span>) : null}
      </label>
    )
  }
}

export default (props) => {
  return (
    <CheckboxGruopContext.Consumer>
      {
        (CheckboxGroup) => {
          return (<Checkbox
            {...props}
            checkboxGroup={CheckboxGroup}
          />)
        }
      }
    </CheckboxGruopContext.Consumer>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func,
  checkboxGroup: PropTypes.any
}

// Checkbox.contextTypes = {
//   checkboxGroup: PropTypes.any
// }
