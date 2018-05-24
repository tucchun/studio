import React, { Component } from 'react'
import Pagination from './Pagination'

export default class PaginationExample extends Component {
  doClick () {
    console.log('hello world')
  }
  render () {
    return (
      <Pagination total={1024} currentPage={1} handleClick={this.doClick} />
    )
  }
}
