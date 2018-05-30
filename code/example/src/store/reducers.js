// import { combineReducers } from 'redux'
import * as OrderReducer from "./order/reducers";
import { SHOW_LOADING, UPDATE_BREAD_LIST } from "./constants";

// 公共数据
function global(
  state = {
    showLoading: false,
    breadList: [{ name: "首页", href: "/" }],
    headerNums: {
      cartNums: 0,
      collectNums: 0
    }
  },
  action
) {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        showLoading: action.show
      };
    case UPDATE_BREAD_LIST:
      return {
        ...state,
        breadList: action.breadList
      };
    default:
      return state;
  }
}

let arr = ["order"];
debugger;
// import('./' + arr[0] + '/reducers.js').then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })
Promise.all([import("./" + arr[0] + "/reducers.js")])
  .then(res => {
    debugger;
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

  var cache = {};

  function importAll (r) {
    r.keys().forEach(key => cache[key] = r(key));
  }
  
  importAll(require.context('./', true, /reducers\.js$/));
  console.log(cache)



export default {
  global,
  ...OrderReducer
};
