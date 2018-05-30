import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Dialog from '../dialog'
import Modal from './Modal'
import { Button } from '../form'
import style from './style.scss'

export class Confirm extends React.Component {
  constructor (props) {
    super(props)
    this.modalRoot = document.getElementById('modal-root')
    this.doCancel = this.doCancel.bind(this)
    this.doOk = this.doOk.bind(this)
  }

  static propTypes = {
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    context: PropTypes.string,
    title: PropTypes.string,
    okText: PropTypes.string,
    cancelText: PropTypes.string
  }

  componentDidMount () {
  }

  doCancel () {
    this.props.onClose()
    this.props.onCancel()
  }

  doOk () {
    this.props.onClose()
    this.props.onOk()
  }

  render () {
    return (
      <Modal modalRoot={this.modalRoot}>
        <Dialog
          width={450}
          height={180}
          show
        >
          <div className={style.confirm}>
            {/* <div className={style['confirm-header']}></div> */}
            <div className={style['confirm-content']}>
              <div className={style['cc-title']}>{this.props.title}</div>
              <div className={style['cc-context']}>{this.props.context}</div>
            </div>
            <div className={style['confirm-footer']}>
              {
                this.props.okText ? (<Button size='small' type='secondary' onClick={this.doOk}>{this.props.okText}</Button>) : null
              }
              {
                this.props.cancelText ? (<Button size='small' onClick={this.doCancel}>{this.props.cancelText}</Button>) : null
              }
            </div>
          </div>
        </Dialog>
      </Modal>
    )
  }
}

export default function ConfirmTemplate (props) {
  var div = document.createElement('div')
  document.body.appendChild(div)
  function onClose () {
    var unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
    props.onClose && props.onClose()
  }
  ReactDOM.render(<Confirm {...props} onClose={onClose} />, div)
}
