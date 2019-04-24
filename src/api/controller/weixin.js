/* eslint-disable no-multi-spaces */
const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const WeixinSerivce = this.service('weixin', 'api');
    if (this.isGet) {
      const verify = WeixinSerivce.checkSignature(this.config('mp').Token,this.get("timestamp"),this.get("nonce"),this.get("signature"))
      if(verify){
        this.assign('content', this.get('echostr')); 
        return this.display();
      }
    }else{
      const verify = WeixinSerivce.checkSignature(this.config('mp').Token,this.get("timestamp"),this.get("nonce"),this.get("signature"))
      if(verify){
        console.log(this.post())
        const postData = this.post().xml
        const openid = postData.FromUserName[0]
        const unionid = await WeixinSerivce.getUnionID(openid)
        const MpSerivce = this.service('mp',postData,postData.FromUserName[0],postData.ToUserName[0],unionid);
        let content = ""

        content =  MpSerivce.method[postData.MsgType[0]]
        if (think.isFunction(content)) {
          content = await content()
        }else{
          content =  content[postData.Event[0]]
          if (think.isFunction(content)) {
            content = await content()
          }else{
            content =  content[postData.EventKey[0]]
            content = await content()
          }
        }
        this.assign('content', content); 
        return this.display();
      }
    }
  }

  async getQRAction() {
    const WeixinSerivce = this.service('weixin', 'api');
    return this.success(await WeixinSerivce.generateQRCode(this.get("str")))
  }
};
