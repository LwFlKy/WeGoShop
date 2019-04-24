// default config
module.exports = {
  default_module: 'api',

  // 微信支付config
  wxpay: { 
    mch_id: '1509618861', // 商户帐号ID
    partner_key: 'UnTEqUOqt1TwbBFVQWr4wqQblVqJCjsf', // 微信支付密钥
    notify_url: 'https://shop.funnything.net/pay/notify' // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
  },

  // 七牛云储存config
  qiniu: { 
    access_key: '5bRR4z4PcWhXZrmbwJKH4pLcRBaai8DOSaKKJadW', // 七牛云公钥
    secret_key: 'kji7p3wMnjfvy491ytFqTMA_x_77D4OzDJCI27LN', // 七牛云私钥
    option: {
      scope: 'shangquan' // 七牛云scope
    }
  },

  // 微信公众号config
  mp: {
    AppID: 'wxee7482e08750f441',
    AppSecret: '399aca41be73febd3eefbccfe1d3298b',
    Token: 'ylisAEWai2sqTB5lzY4EF5TPJHzFRli4',
    EncodingAESKey: 'WwrJXUpshr4XCPpcXE5fLnSWiMLyuI61nF8xK9RXykT'
  },

  // 小程序config
  miniprogram: {
    AppID: 'wxd0abaa29484ece63',
    AppSecret: 'c061ac9f2afee683cbdfe2bd21021322'
  }
};
