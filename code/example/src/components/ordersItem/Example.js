import React from 'react'
import { OrdersItem, OrderPrd, Process, Describe } from './index'

export default class Example extends React.Component {
  render () {
    return (
      <div>
        <Process />
        <Describe />
        <OrdersItem>
          <OrderPrd />
        </OrdersItem>
      </div>
    )
  }
}
