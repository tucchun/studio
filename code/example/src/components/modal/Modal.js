import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
export default class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.el = document.createElement('div')
  }

  static propTypes = {
    modalRoot: PropTypes.any,
    children: PropTypes.any
  }

  componentDidMount () {
    this.props.modalRoot.appendChild(this.el)
  }

  componentWillUnmount () {
    this.props.modalRoot.removeChild(this.el)
  }

  render () {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}
