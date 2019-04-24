// 微信公众号service
const rp = require('request-promise');

module.exports = class extends think.Service {

  /*
  * 向用户发送模板信息
  * return @Object
  */
  async sendTmpMsg(openid,TmpId,content){
    const options = {
      method: 'POST',
      url:"https://api.weixin.qq.com/cgi-bin/message/template/send",
      qs:{
        "access_token":await this.getAccessToken(),
      },
      body:{
        "touser":openid,
        "template_id":TmpId,
        "data":content
      },
      json:true
    }
    return await rp(options);
  }

  /*
  * 从数据库中获取AccessToken
  * return @String
  */
  async getAccessToken(from = "mp"){
    if (from == "mp") {
      const result = await this.model("config").where({item:"mp_accesstoken"}).find()
      return result.value
    }else if(from == "miniprogram"){
      const result = await this.model("config").where({item:"miniprogram_accesstoken"}).find()
      return result.value
    }
  }
};
