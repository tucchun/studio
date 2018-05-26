import React, { Component } from 'react'
import { Button, Input } from '../../../components/form/index'
import PropTypes from 'prop-types'
import style from './style.scss'
import { multStyle } from '../../../utils/common'

export default class EditorCount extends Component {
  constructor (props) {
    super(props)
    this.updateCount = this.updateCount.bind(this)
    this.state = {
      count: props.count,
      isUseable:props.isUseable
    }
  }

  componentWillUpdate (nextProps, nextState) {
    // console.log(nextState)
    // nextProps.changeCount(nextState.count)
  }

  componentDidMount () {
    // console.log('ddddd')
  }

  updateCount (count) {
    let counts = parseInt(count)
    if (this.props.isUseable) {
      this.props.changeCount(counts)
      this.setState({
        count:counts
      })
    }
  }

  render () {
    return (
      <div className={style.editorCount}>
        <Button className={multStyle(style.button, style.minus)} onClick={
          () => {
            let count = this.state.count
            count = count - 1 || 1
            this.updateCount(count)
          }
        }>-</Button>
        <Input className={style.count} value={this.state.count} onChange={
          (obj) => {
            if (obj.value > 0) {
              this.updateCount(obj.value)
            }
          }
        }/>
        <Button className={multStyle(style.button, style.add)} onClick={
          () => {
            let count = this.state.count
            count++
            this.updateCount(count)
          }
        }>+</Button>
      </div>
    )
  }
}
EditorCount.propTypes = {
  count: PropTypes.number.isRequired,
  changeCount: PropTypes.func.isRequired,
  isUseable:PropTypes.bool
}
