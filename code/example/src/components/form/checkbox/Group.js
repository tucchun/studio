import React from 'react'
import PropTypes from 'prop-types'
import { CheckboxGruopContext } from '../../context'

// const CheckboxGruopContext = React.createContext({
//   toggleOption: function () {},
//   value: []
// })
export default class Group extends React.Component {
  constructor (props) {
    super(props)
    this.toggleOption = this.toggleOption.bind(this)
    // this.state = {
    //   value: props.value || props.defaultValue || []
    // }
  }

  static defaultProps = {
    onChange: () => {}
  }

  // getChildContext () {
  //   return {
  //     checkboxGroup: {
  //       toggleOption: this.toggleOption,
  //       value: this.props.value || this.props.defaultValue || []
  //     }
  //   }
  // }

  toggleOption (option) {
    let propsValue = this.props.value || this.props.defaultValue || []
    let optionIndex = propsValue.indexOf(option.value)
    let value = [...propsValue]
    if (optionIndex === -1) {
      value.push(option.value)
    } else {
      value.splice(optionIndex, 1)
    }
    // if (!('value' in this.props)) {
    //   this.setState({ value })
    // }
    this.props.onChange(value)
  }

  render () {
    return (
      <React.Fragment>
        <CheckboxGruopContext.Provider value={{
          toggleOption: this.toggleOption,
          value: this.props.value || this.props.defaultValue || [],
          state: true
        }}>
          {this.props.children}
        </CheckboxGruopContext.Provider>
      </React.Fragment>
    )
  }
}

// Group.childContextTypes = {
//   checkboxGroup: PropTypes.any
// }

Group.propTypes = {
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  children: PropTypes.array,
  onChange: PropTypes.func.isRequired
}
