import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../form/button/Button'
import Img from '../../Image'
import { multStyle } from '../../../utils/common'
// import commonStyle from '../../../assets/style/common.scss'
import style from './style.scss'

export default class Prd extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number,
    productName: PropTypes.string,
    unitPrice: PropTypes.number,
    url: PropTypes.string,
    status: PropTypes.string
  }
  render () {
    let { count, productName, unitPrice, url, status } = this.props
    let btn = null
    if (status === '20') {
      btn = (<Button type='m-3' size='small'>确认收货</Button>)
    } else if (status === '30') {
      btn = (
        <React.Fragment>
          <i className={style['icon-verify']} />
          <span className={style.verify}>已确认收货</span>
        </React.Fragment>
      )
    }
    return (
      <div className={style['prd-item']}>
        <div className={style['prd-image']}>
          <Img src={url || ''} />
        </div>
        <div className={style['prd-desc']}>
          <div className={style['prd-desc-title']}>{productName}</div>
          <div className={multStyle(style['prd-desc-other'], 'clearfix')}>
            <div className={multStyle(style['prd-desc-info'], 'pull-left')}>
              <div className={style['prd-desc-color']}>&nbsp;</div>
              <div className={style['prd-desc-price']}>
                <span className={style['prd-price']}><i>&yen;</i>{unitPrice}</span>
                <span className={style['prd-count']}>&times;{count}</span>
              </div>
            </div>
            <div className={multStyle(style['prod-desc-receive'], 'pull-right')}>
              {btn}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
