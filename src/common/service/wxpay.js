const crypto = require('crypto');
const md5 = require('md5');

module.exports = class extends think.Service {
  /**
   * 统一下单
   * @param payInfo
   * @returns {Promise}
   */
   
  /**
   * 统一下单
   * @param payInfo
   * @returns {Promise}
   */
  createUnifiedOrder(payInfo) {
    const WeiXinPay = require('weixinpay');
    const weixinpay = new WeiXinPay({
      appid: think.config('miniprogram.AppID'), // 微信小程序appid
      openid: payInfo.openid, // 用户openid
      mch_id: think.config('wxpay.mch_id'), // 商户帐号ID
      partner_key: think.config('wxpay.partner_key') // 秘钥
    });
    return new Promise((resolve, reject) => {
      weixinpay.createUnifiedOrder({
        body: payInfo.body,
        out_trade_no: payInfo.out_trade_no,
        total_fee: payInfo.total_fee,
        spbill_create_ip: payInfo.spbill_create_ip,
        notify_url: think.config('wxpay.notify_url'),
        trade_type: 'JSAPI'
      }, (res) => {
        if (res.return_code === 'SUCCESS' && res.result_code === 'SUCCESS') {
          const returnParams = {
            'appid': res.appid,
            'timeStamp': parseInt(Date.now() / 1000) + '',
            'nonceStr': res.nonce_str,
            'package': 'prepay_id=' + res.prepay_id,
            'signType': 'MD5'
          };
          const paramStr = `appId=${returnParams.appid}&nonceStr=${returnParams.nonceStr}&package=${returnParams.package}&signType=${returnParams.signType}&timeStamp=${returnParams.timeStamp}&key=` + think.config('wxpay.partner_key');
          returnParams.paySign = md5(paramStr).toUpperCase();
          resolve(returnParams);
        } else {
          reject(res);
        }
      });
    });
  }

  /**
   * 生成排序后的支付参数 query
   * @param queryObj
   * @returns {Promise.<string>}
   */
  buildQuery(queryObj) {
    const sortPayOptions = {};
    for (const key of Object.keys(queryObj).sort()) {
      sortPayOptions[key] = queryObj[key];
    }
    let payOptionQuery = '';
    for (const key of Object.keys(sortPayOptions).sort()) {
      payOptionQuery += key + '=' + sortPayOptions[key] + '&';
    }
    payOptionQuery = payOptionQuery.substring(0, payOptionQuery.length - 1);
    return payOptionQuery;
  }

  /**
   * 对 query 进行签名
   * @param queryStr
   * @returns {Promise.<string>}
   */
  signQuery(queryStr) {
    queryStr = queryStr + '&key=' + think.config('wxpay.partner_key');
    const md5 = require('md5');
    const md5Sign = md5(queryStr);
    return md5Sign.toUpperCase();
  }

  /**
   * 处理微信支付回调
   * @param notifyData
   * @returns {{}}
   */
  payNotify(notifyData) {
    if (think.isEmpty(notifyData)) {
      return false;
    }

    const notifyObj = {};
    let sign = '';
    for (const key of Object.keys(notifyData)) {
      if (key !== 'sign') {
        notifyObj[key] = notifyData[key][0];
      } else {
        sign = notifyData[key][0];
      }
    }
    if (notifyObj.return_code !== 'SUCCESS' || notifyObj.result_code !== 'SUCCESS') {
      return false;
    }
    const signString = this.signQuery(this.buildQuery(notifyObj));
    if (think.isEmpty(sign) || signString !== sign) {
      return false;
    }
    return notifyObj;
  }
};
