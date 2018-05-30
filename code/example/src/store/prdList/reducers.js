import {
  FETCH_PRD_LIST_SUCCESS,
  FETCH_PRD_LIST_ASC_OR_DESC,
  UPDATE_PARAMS,
  FETCH_CLASSIFY_LIST
} from './constants'

// 订单列表
export function prdData (state = {
  // isIncreCur: false, // 是否升序
  // isDescrCur: false, // 是否降序
  classifyList: [],
  currentPage: 1, // 当前页下标
  prdList: [], // 商品列表
  totalCount: 0, // 总商品数
  searchData: {
    productName: undefined, // 查询商品名称
    firstClassId: undefined, // 一级分类
    secondClassId: undefined, // 二级分类
    thirdClassId: undefined, // 三级分类
    pageNo: 0,
    pageSize: 2,
    bigPrice: undefined,
    minPrice: undefined,
    sortField: undefined,
    sortType: undefined
  }
}, action) {
  switch (action.type) {
    case FETCH_PRD_LIST_SUCCESS:
      return {
        ...state,
        prdList: action.result.list,
        totalCount: action.result.totalCount || 0
      }
    case FETCH_PRD_LIST_ASC_OR_DESC:
      return {
        ...state,
        ...action.action
      }
    case UPDATE_PARAMS:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          ...action.params
        }
      }
    case FETCH_CLASSIFY_LIST:
      return {
        ...state,
        classifyList: action.result.frontClassifies
      }
    default:
      return state
  }
}
