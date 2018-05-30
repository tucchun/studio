import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL } from './constants'

export function loginSuccess (result) {
  return {
    type: LOGIN_SUCCESS,
    result
  }
}

export function loginFail (result) {
  return {
    type: LOGIN_FAIL,
    result
  }
}

export function logoutSuccess (result) {
  return {
    type: LOGOUT_SUCCESS,
    result
  }
}
export function logoutFail (result) {
  return {
    type: LOGOUT_FAIL,
    result
  }
}
