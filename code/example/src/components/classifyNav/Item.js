import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { multStyle } from '../../utils/common'
import style from './style.scss'
import PropTypes from 'prop-types'
export default class Item extends Component {
  render (props) {
    const { itemList } = this.props
    let x = 0
    return (
      <ul className={style.main}>
        {
          itemList && itemList.map(e => (
            <li key={e.classId}>
              {/* <Link to={{ pathname: '/pages/prdList', hash: '#', search: `?firstClassId=${e.classId}` }}> */}
              <Link to={`/pages/prdList/${e.classId}`}>
                <p><i className={multStyle(style.ititle, style[`ititle${++x}`])} /><span>{e.className}</span></p>
              </Link>
              {
                <div className={style['classify-panel']}>
                  {
                    e.subFrontClassifyTree && e.subFrontClassifyTree.map(item => (
                      <dl key={item.classId}>
                        <Link to={`/pages/prdList/${e.classId}/${item.classId}`}>
                          {/* <Link to={{ pathname: '/prdList', hash: '#', search: `?firstClassId=${e.classId}&secondClassId=${item.classId}` }}> */}
                          <dt>{item.className}</dt>
                        </Link>
                        {
                          item.subFrontClassifyTree && item.subFrontClassifyTree.map(k => (
                            // <Link
                            //   key={k.classId}
                            //   to={{ pathname: '/prdList', hash: '#', search: `?firstClassId=${e.classId}&secondClassId=${item.classId}&thirdClassId=${k.classId}` }}>
                            <Link key={k.classId} to={`/pages/prdList/${e.classId}/${item.classId}/${k.classId}`}>
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
Item.propTypes = {
  itemList: PropTypes.array
}
