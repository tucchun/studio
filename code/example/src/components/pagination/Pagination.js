import React, { Component } from 'react'
import style from './style.scss'
import { multStyle } from '../../utils/common'
import PropTypes from 'prop-types'
/**
 * @class Pagination
 * curentPage:
 * totalCount:
 * handleClick:
 */
class Pagination extends Component {
  constructor (props) {
    super(props)
    let pageSize = props.pageSize || 40
    this.state = {
      currentPage: props.currentPage,
      totalCount: Number(props.totalCount),
      handleClick: props.handleClick,
      totalPage: (props.totalCount % pageSize) ? parseInt(props.totalCount / pageSize) + 1 : props.totalCount / pageSize
    }
    this.doPrevClick = this.doPrevClick.bind(this)
    this.doNumClick = this.doNumClick.bind(this)
    this.doNextClick = this.doNextClick.bind(this)
  }
  static propTypes = {
    currentPage: PropTypes.number,
    totalCount: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    pageSize: PropTypes.number
  }
  static defaultProps = {
    currentPage: 1
  }
  doPrevClick (e) {
    console.log('in doPrev')
    if (this.state.currentPage > 1) {
      this.setState({ currentPage : this.state.currentPage - 1 })
      this.state.handleClick(e, this.state.currentPage - 1)
    }
  }
  doNextClick (e) {
    console.log('in doNext')
    if (this.state.currentPage < this.state.totalPage) {
      this.setState({ currentPage : this.state.currentPage + 1 })
      this.state.handleClick(e, this.state.currentPage + 1)
    }
  }
  doNumClick (e) {
    this.setState({ currentPage: Number(e.target.text) })
    this.state.handleClick(e)
  }
  render () {
    // 当前页码
    // 显示分页按钮
    let currentPage = this.state.currentPage
    let pageNum = []
    let totalPage = this.state.totalPage
    // 根据返回的总记录数计算当前页显示的数据
    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        if (currentPage === i) {
          pageNum.push({ num: i, cur: true, key: i })
        } else {
          pageNum.push({ num: i, cur: false, key: i })
        }
      }
    } else {
      if (currentPage > 3 && currentPage < totalPage - 2) {
        pageNum.push({ num: 1, cur: false, key: 1 })
        pageNum.push({ num: '...', disable: true, key: '...' })
        pageNum.push({ num: currentPage - 1, cur: false, key: currentPage - 1 })
        pageNum.push({ num: currentPage, cur: true, key: currentPage })
        pageNum.push({ num: currentPage + 1, cur: false, key: currentPage + 1 })
        pageNum.push({ num: '...', disable: true, key: '....' })
        pageNum.push({ num: totalPage, cur: false, key: totalPage })
      }
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          if (currentPage === i) {
            pageNum.push({ num: i, cur: true, key: i })
          } else {
            pageNum.push({ num: i, cur: false, key: i })
          }
        }
        pageNum.push({ num: '...', disable: true, key: '...' })
        pageNum.push({ num: totalPage, cur: false, key: totalPage })
      }
      if (currentPage > totalPage - 3) {
        pageNum.push({ num: 1, cur: false, key: 1 })
        pageNum.push({ num: '...', disable: true, key: '...' })
        for (let i = totalPage - 2; i <= totalPage; i++) {
          if (currentPage === i) {
            pageNum.push({ num: i, cur: true, key: i })
          } else {
            pageNum.push({ num: i, cur: false, key: i })
          }
        }
      }
    }
    return (
      <div>
        <div className={style.pagination}>
          <a className={currentPage === 1
            ? multStyle(style.prev, style.disable) : style.prev} onClick={this.doPrevClick}>上一页</a>
          <span>
            {
              pageNum.map(function (curPageNum) {
                return (
                  !curPageNum.disable ? <a onClick={this.doNumClick} key={curPageNum.key} className={curPageNum.cur
                    ? multStyle(style.num, style.current) : style.num}>{curPageNum.num}</a>
                    : <a className={style.noHover} key={curPageNum.key}>{curPageNum.num}</a>
                )
              }.bind(this))
            }
          </span>
          <a className={currentPage === totalPage
            ? multStyle(style.next, style.disable) : style.next} onClick={this.doNextClick}>下一页</a>
        </div>
      </div>
    )
  }
}
export default Pagination
