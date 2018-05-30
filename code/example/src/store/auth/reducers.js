// import { combineReducers } from 'redux'
import {
  LOGIN, LOGOUT
} from './constants'

// Auth
export function auth (state = {
  status: 'logged out',
  value: 'guest'
}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        status: 'logged in',
        value: action.value
      }
    case LOGOUT:
      return {
        ...state,
        status: 'logged out',
        value: action.value
      }
    default:
      return state
  }
}
