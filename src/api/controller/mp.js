const Base = require('./base.js');
const rp = require('request-promise');

module.exports = class extends Base {
  /**
   * 获取用户的收货地址
   * @return {Promise} []
   */
  async getAccessTokenAction() {
    let options = {
      method: 'GET',
      url:"https://api.weixin.qq.com/cgi-bin/token",
      qs:{
        "grant_type": "client_credential",
        "appid": this.config('miniprogram').AppID,
        "secret": this.config('miniprogram').AppSecret
      }
    }
    let result = JSON.parse(await rp(options))
    await this.model("config").where({item:"miniprogram_accesstoken"}).update({value:result.access_token})
    options = {
      method: 'GET',
      url:"https://api.weixin.qq.com/cgi-bin/token",
      qs:{
        "grant_type": "client_credential",
        "appid": this.config('mp').AppID,
        "secret": this.config('mp').AppSecret
      }
    }
    result = JSON.parse(await rp(options))
    await this.model("config").where({item:"mp_accesstoken"}).update({value:result.access_token})
    return true
  }

  async setMenuAction() {
    let options = {
      method: 'POST',
      url:"https://api.weixin.qq.com/cgi-bin/menu/create",
      qs:{
        "access_token" : await this.service("weixin","api").getAccessToken(),
      },
      body: {
        button:[
          {    
            "type":"scancode_waitmsg",
            "name":"券核销",
            "key":"VOUCHER"
          }
        ]
      },
      json: true
    }
    let result = await rp(options)
    console.log(result)
  }
};
