const crypto = require('crypto');
const md5 = require('md5');
const rp = require('request-promise');

module.exports = class extends think.Service {

  async getAccessToken(from = "mp"){
    if (from == "mp") {
      const result = await this.model("config").where({item:"mp_accesstoken"}).find()
      return result.value
    }else if(from == "miniprogram"){
      const result = await this.model("config").where({item:"miniprogram_accesstoken"}).find()
      return result.value
    }
  }

  async getUnionID(openid,from = "mp"){

    const options = {
      method: 'POST',
      url:"https://api.weixin.qq.com/cgi-bin/user/info",
      qs:{
        "access_token" : await this.getAccessToken(from),
        "openid": openid
      },
      json: true
    }
    const result = await rp(options)
    return result.unionid
  }

  async generateQRCode(content,type = "str"){
    let scene_str = ""
    if (type == "str") {
      scene_str = content
    }else if(type == "json"){
      scene_str = JSON.stringify(content)
    }
    const options = {
      method: 'POST',
      url:"https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=" + await this.getAccessToken(),
      body:{
        "action_name": "QR_LIMIT_STR_SCENE", 
        "action_info": {
          "scene":{
            "scene_str": content
          }
        }
      },
      json: true
    }
    const result = await rp(options)
    console.log(result)
    return result.ticket
  }
  checkSignature(token,timestamp,nonce,signature){
    let tmpArr = [timestamp,token,nonce]
    tmpArr.sort()
    tmpArr = tmpArr.join("")
    const sha1 = crypto.createHash('sha1').update(tmpArr).digest('hex');
    if (sha1 == signature) {
      return true
    }else{
      return false
    }
  }

  /**
   * 解析微信登录用户数据
   * @param sessionKey
   * @param encryptedData
   * @param iv
   * @returns {Promise.<string>}
   */
  async decryptUserInfoData(sessionKey, encryptedData, iv) {
    // base64 decode
    const _sessionKey = Buffer.from(sessionKey, 'base64');
    encryptedData = Buffer.from(encryptedData, 'base64');
    iv = Buffer.from(iv, 'base64');
    let decoded = '';
    try {
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');

      decoded = JSON.parse(decoded);
    } catch (err) {
      return '';
    }

    if (decoded.watermark.appid !== think.config('miniprogram.AppID')) {
      return '';
    }

    return decoded;
  }

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
        attach: payInfo.attach,
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

  async sendTemplateMessage(template_id,form_id,data){
    const AccessToken = await this.model("config").where({item:"mp_accesstoken"}).getField('value')
    const options = {
      method: 'POST',
      url:"https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token="+AccessToken,
      body:{
        touser: "o_tUM5OQNG12wjW1LT68KmebbK7g",
        template_id: template_id,
        form_id: form_id,
        data: data,
      },
      json: true
    }
    const rp = require('request-promise');
    rp(options)
  }
};
