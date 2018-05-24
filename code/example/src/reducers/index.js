// import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  UPDATECOLLECT
} from '../actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}


function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function collects (state = {
  headerNums: {
    cartNums: 10,
    collectNums: 10
  }
}, action) {
  switch (action.type) {
    case UPDATECOLLECT:
      return {
        ...state,
        headerNums: {
          ...state.headerNums,
          cartNums: action.count.cartNums,
          collectNums: action.count.collectNums
        }
      }
    default:
      return state
  }
}

export default {
  visibilityFilter,
  todos,
  collects
}
