import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { multStyle } from '../../utils/common'
import ajax from '../../utils/ajax'
import style from './style.scss'

export default class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount () {
    ajax({
      url: '/los/2b-admin-front.queryFrontClassTree'
    }).then(res => {
      this.setState({
        list: res.frontClassifyTree
      })
    })
  }
  render () {
    const list = this.state.list
    return (
      <ul className={style.main}>
        {
          list && list.map(e => (
            <li key={e.classId}>
              <Link to={{ pathname: '/prdList', hash: '#', search: `?firstClassId=${e.classId}` }}>
                <p><i className={multStyle(style.ititle, style[`ititle${e.classId}`])} /><span>{e.className}</span></p>
              </Link>
              {
                <div className={style['classify-panel']}>
                  {
                    e.subFrontClassifyTree && e.subFrontClassifyTree.map(item => (
                      <dl key={item.classId}>
                        <Link to={{ pathname: '/prdList', hash: '#', search: `?firstClassId=${e.classId}&secondClassId=${item.classId}` }}>
                          <dt>{item.className}</dt>
                        </Link>
                        {
                          item.subFrontClassifyTree && item.subFrontClassifyTree.map(k => (
                            <Link
                              key={k.classId}
                              to={{ pathname: '/prdList', hash: '#', search: `?firstClassId=${e.classId}&secondClassId=${item.classId}&thirdClassId=${k.classId}` }}>
                              <dd>{k.className}</dd>
                            </Link>
                          ))
                        }
                      </dl>
                    )
                    )
                  }
                </div>
              }
            </li>
          ))
        }
      </ul>
    )
  }
}
