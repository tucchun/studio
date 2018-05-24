import React from 'react'
import PropTypes from 'prop-types'
// import DEFAULT from 'assets/images/default.png'

export default class UIImage extends React.Component {
  constructor (props) {
    super(props)
    this.doError = this.doError.bind(this)
  }

  static defaultProps = {
    size: '70'
  }

  doError (e) {
    let size = this.props.size
    let currentTarget = e.currentTarget
    let promise = {}
    if (size === '70') {
      promise = import('../../assets/images/img_default_70x70.png')
    } else if (size === '100') {
      promise = import('../../assets/images/img_default_100x100.png')
    } else if (size === '200') {
      promise = import('../../assets/images/img_default_200x200.png')
    } else if (size === '450') {
      promise = import('../../assets/images/img_default_450x450.png')
    }
    promise.then(img => {
      currentTarget.src = img
      currentTarget.onerror = null // 防止循环
    })
  }

  render () {
    return (
      <img onError={this.doError} {...this.props} />
    )
  }
}

UIImage.propTypes = {
  size: PropTypes.string
}
