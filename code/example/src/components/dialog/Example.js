import React from 'react'
import Button from '../form/button/Button'
import Dialog from './index'

export default class DialogExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }
  render () {
    return (
      <div>
        <Button type='primary' onClick={() => this.setState({ show: true })}>打开Dialog</Button>
        <Dialog show={this.state.show}>
          <Button type='primary' onClick={() => this.setState({ show: false })}>关闭Dialog</Button>
        </Dialog>
      </div>
    )
  }
}
