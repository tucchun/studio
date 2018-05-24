import React, { Component } from 'react'
import { Button, Input } from '../../../components/form/index'
import PropTypes from 'prop-types'
import style from './style.scss'
import { multStyle } from '../../../utils/common'

export default class EditorCount extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: props.count
    }
  }

  componentWillUpdate (nextProps, nextState) {
    // console.log(nextState)
    // nextProps.changeCount(nextState.count)
  }

  componentDidMount () {
    // console.log('ddddd')
  }

  render () {
    return (
      <div className={style.editorCount}>
        <Button className={multStyle(style.button, style.minus)} onClick={
          () => {
            let count = this.state.count
            count = count - 1 > 0 ? count - 1 : 1
            this.props.changeCount(count)
            this.setState({
              count
            })
          }
        }>-</Button>
        <Input className={style.count} value={this.state.count} onChange={
          (obj) => {
            if (obj.value > 0) {
              this.props.changeCount(obj.value)
              this.setState({
                count: parseInt(obj.value)
              })
            }
          }
        }/>
        <Button className={multStyle(style.button, style.add)} onClick={
          () => {
            let count = this.state.count
            count++
            this.props.changeCount(count)
            this.setState({
              count
            })
          }
        }>+</Button>
      </div>
    )
  }
}
EditorCount.propTypes = {
  count: PropTypes.number.isRequired,
  changeCount: PropTypes.func.isRequired
}
