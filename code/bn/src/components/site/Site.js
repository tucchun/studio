import React, { Component } from 'react'
// import { Carousel } from 'antd'
import './style.css'
export default class Index extends Component {

  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (a, b, c) {
    console.log(a, b, c)
  }

  render (props) {
    return (
      <div>
        1
      </div>
    )
  }
}
