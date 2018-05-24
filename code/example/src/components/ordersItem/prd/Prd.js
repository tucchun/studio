import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../form/button/Button'
import Img from '../../Image'
import { multStyle } from '../../../utils/common'
// import commonStyle from '../../../assets/style/common.scss'
import style from './style.scss'

export default class Prd extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    productName: PropTypes.string,
    unitPrice: PropTypes.number
  }
  render () {
    let { count, productName, unitPrice } = this.props
    return (
      <div className={style['prd-item']}>
        <div className={style['prd-image']}>
          <Img src='http://b.hi11photos.baidu.com/image/ic/item/314e251f95cad1c85e377d83733e6709c83d5182.jpg' />
        </div>
        <div className={style['prd-desc']}>
          <div className={style['prd-desc-title']}>{productName}</div>
          <div className={multStyle(style['prd-desc-other'], 'clearfix')}>
            <div className={multStyle(style['prd-desc-info'], 'pull-left')}>
              <div className={style['prd-desc-color']}>白色</div>
              <div className={style['prd-desc-price']}>
                <span className={style['prd-price']}><i>&yen;</i>{unitPrice}</span>
                <span className={style['prd-count']}>&times;{count}</span>
              </div>
            </div>
            <div className={multStyle(style['prod-desc-receive'], 'pull-right')}>
              {/* <Button type='m-3' size='small'>确认收货</Button> */}
              <i className={style['icon-verify']} /><span className={style.verify}>已确认收货</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
