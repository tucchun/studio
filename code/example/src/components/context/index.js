import React from 'react'

export const CheckboxGruopContext = React.createContext({
  toggleOption: function () { },
  value: [],
  state: false
})

export const IndexContext = React.createContext({
  data: []
})
