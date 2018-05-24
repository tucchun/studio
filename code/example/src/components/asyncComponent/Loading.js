import React from 'react'
import { Loading } from '../loading'
import { NotfindPage } from '../404'

export default function Load (props) {
  if (props.error) {
    return <NotfindPage />
  } else if (props.pastDelay) {
    return <Loading />
  } else {
    return null
  }
}
