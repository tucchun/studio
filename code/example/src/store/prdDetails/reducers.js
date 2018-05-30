// import { combineReducers } from 'redux'
import {
  FETCH_PRD_PRDDETAILS_SUCCESS,
  UPDATE_PARAMS,
  FETCH_CLASSIFY_LIST,
  DO_PRCSCOUNT_CHANGE_CLICK,
  DO_SCROLL_ARROW,
  UPDATE_CURRENT_INDEX
} from './constants'

// 订单列表
export function prdDetails (state = {
  curImgIndex: 0, // 当前大图显示下标
  topImgIndex: 0, // 顶端图下标
  botmImgIndex: 5, // 最底端图下标
  topArrDis: true, // 上箭头是否不可用 默认不可用
  botmArrDis: false, // 下箭头是否不可用 默认可用
  smlImgList: [], // 小图列表
  lagImgList: [], // 详情大图列表
  prdInfo: {}, // 商品详情信息
  prcsCount: 1, // 购买数量
  prdCode: '', // 详情页商品代码
  favorite: 0 // 是否收藏
}, action) {
  switch (action.type) {
    case FETCH_PRD_PRDDETAILS_SUCCESS:
      let imgList = action.result.productAttaches
      let lagImgList = imgList.filter(item => item.attachType === '09')
      lagImgList = (lagImgList) && lagImgList.sort((a, b) => a.attachOrder - b.attachOrder)
      let smlImgList = imgList.filter(item => item.attachType === '01')
      return {
        ...state,
        prdInfo: action.result,
        lagImgList: lagImgList,
        smlImgList: smlImgList,
        botmImgIndex: smlImgList.length,
        curImgIndex: 0,
        botmArrDis: smlImgList.length <= 5,
        favorite: action.result.favorite
      }
    case UPDATE_PARAMS:
      return {
        ...state,
        ...action.params
      }
    case FETCH_CLASSIFY_LIST:
      return {
        ...state,
        classifyList: action.result.frontClassifies
      }
    case DO_PRCSCOUNT_CHANGE_CLICK:
      return {
        ...state,
        prcsCount: action.prcsCount
      }
    case DO_SCROLL_ARROW:
      let payload = action.params
      return {
        ...state,
        topImgIndex: payload.topImgIndex,
        topArrDis: payload.topArrDis,
        botmArrDis: payload.botmArrDis
      }
    case UPDATE_CURRENT_INDEX:
      return {
        ...state,
        curImgIndex: action.params.curImgIndex
      }
    default:
      return state
  }
}
