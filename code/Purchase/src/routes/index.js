// component and route definition
const components = [
  {
    // PARENTS' PATH MUST END UP WITH /:*?
    path: '/home/:*?',
    component: 'TabBar',
    childRoute: [
      // CHILD ROUTE MUST CONTAIN PARENTS' PATH!!
      { path: '/home/index', component: 'Home' },
      // { path: '/home', component: 'TabBar' },
      { path: '/home/personalcenter', component: 'PersonalCenter' },
      // ShopCart
      { path: '/home/shopcart', component: 'ShopCart' },
      // classify 分类
      { path: '/home/classify', component: 'Classify' },
      // tab 切换测试
      // { path: '/home/classify/example', component: 'Classify/example' },
      { path: '/home/classify/loadrefresh', component: 'Classify/loadrefresh' }
    ]
  },
  { path: '/search', component: 'Search' },
  { path: '/counter', component: 'Counter' },
  { path: '/mobielogin', component: 'MobieLogin' },
  // { path: '/addressmng', component: 'AddressMng' },
  { path: '/paydetail', component: 'PayDetail' },
  { path: '/storelist', component: 'StoreList' },
  { path: '/mycoupon', component: 'MyCoupon' },
  { path: '/mapselect', component: 'Mapselect' },
  { path: '/order/ordersettle', component: 'Order/OrderSettle' },
  { path: '/order/purchaseProdDetail', component: 'Order/PurchaseProdDetail' },
  // goodsdetail 商品详情相关
  { path: '/goodsdetail/:goodsid', component: 'GoodsDetail' },
  { path: '/package/select', component: 'GoodsDetail/Zuheyouhui' },
  // Address
  { path: '/address/location', component: 'Address/Location' },
  { path: '/address/mng', component: 'Address/AddressMng' },
  { path: '/address/edit', component: 'Address/EditAddress' },
  { path: '/address/select', component: 'Address/SelectAddress' },
  { path: '/address/map', component: 'Address/Map' },

  // Order
  { path: '/order/detail', component: 'Order/OrderDetail' },
  { path: '/order/text', component: 'Order/OrderProdList' },

  // 满减列表
  { path: '/shopcart/moneyoffList', component: 'ShopCart/MoneyOffList' },
  // 赠品列表
  { path: '/shopcart/privilegeList', component: 'ShopCart/PrivilegeList' },
  // 换购列表
  { path: '/shopcart/redemptionList', component: 'ShopCart/RedemptionList' },
  // 支付详情
  { path: '/paymentself', component: 'PaymentSelf' },
  // 我的订单
  { path: '/waitingdelivery', component: 'WaitingDelivery' },
  { path: '/useragreen', component: 'userAgreen' },
  // 过渡页面
  { path: '/transfer', component: 'Transfer' },

  // 扫码购 订单结算
  { path: '/smgordersettle', component: 'SweepCodePurchase/OrderSettle' },
  // 扫码购 购物车
  { path: '/smgshopcart', component: 'SweepCodePurchase/ShopCart' },
  // 自由购订单列表
  { path: '/freeorderlist', component: 'SweepCodePurchase/FreeOrderList' },
  // 自由购之前的提示页面
  { path: '/beforescan', component: 'SweepCodePurchase/BeforeScan' },
  // 扫码
  { path: '/freescan', component: 'SweepCodePurchase/FreeScan' },
  // 货架
  { path: '/goodsscan', component: 'SweepCodePurchase/GoodsScan' },
  // 支付详情
  { path: '/smgpaymentself', component: 'SweepCodePurchase/PaymentSelf' },
  // 扫码购订单详情
  { path: '/smgorderdetail', component: 'SweepCodePurchase/OrderDetail' },
  { path: '/activity/:activityid', component: 'Activity' }
]

export default components
