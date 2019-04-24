// default config
module.exports = {
  // 可以公开访问的Controller
  publicController: [
    // 格式为controller
    'index',
    'catalog',
    'topic',
    'auth',
    'goods',
    'shop',
    'search',
    'region',
    'promotion',
    'mp',
    'weixin',
    'recharge',
    'voucher',
    'category'
  ],

  // 可以公开访问的Action
  publicAction: [
    // 格式为： controller+action
    'user/getShopOwnState'
  ]
};
