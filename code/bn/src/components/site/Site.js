import React, { Component } from 'react'
import { Carousel } from 'antd'
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
        <Carousel afterChange={this.onChange}>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
      </div>
    )
  }
}
