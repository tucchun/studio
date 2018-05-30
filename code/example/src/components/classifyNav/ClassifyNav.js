import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { multStyle } from '../../utils/common'
// import CommmonStyle from '../../assets/style/common.scss'
import Item from './Item'
import style from './style.scss'
export default class Index extends Component {
  doClickItem = () => {
    this.props.onClick()
  }
  render (props) {
    const { list } = this.props
    return (
      <div className={style['classify-nav']}>
        <div className={style['content']}>
          <div className={style.title} onClick={this.doClickItem}>
            <i className={style['title-icon']} />
            <h3>全部分类</h3>
            <Item itemList={list} />
          </div>
        </div>
      </div>
    )
  }
}
Index.propTypes = {
  list: PropTypes.array,
  onClick: PropTypes.func
}
