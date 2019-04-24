const Base = require('./base.js');
const rp = require("request-promise")
module.exports = class extends Base {
  async indexAction() {
    const data = this.get()
    let options = {
      method: 'GET',
      url:"https://api.weixin.qq.com/sns/oauth2/access_token?code="+data.code,
      qs:{
        "grant_type": "authorization_code",
        "appid": this.config('mp').AppID,
        "secret": this.config('mp').AppSecret
      }
    }
    let result = JSON.parse(await rp(options))

    const voucherModel = this.model("voucher")
    const voucherInfo = await voucherModel.where({code:data.state}).find()

    const orderModel = this.model("order")
    const orderInfo = await orderModel.where({id:voucherInfo.order_id}).find()

    const promotionInfo = this.model("promotion").where({id:voucherInfo.promotion_id}).find()

    const adminInfo = await this.model("admin").where({weixin_openid:result.openid}).find()

    let ReplyContent = []
    let letGo = true
    console.log(adminInfo.shop_id,orderInfo.shop_id)

    if (adminInfo.shop_id !== orderInfo.shop_id) {
      letGo = false
      this.assign('content', '非本店核销券'); 
      return this.display('api/weixin_index'); 
    }else if (voucherInfo.status !== 0) {
      letGo = false
      this.assign('content', '该券已使用'); 
      return this.display('api/weixin_index'); 
    }else if (orderInfo.order_status !== 201) {
      letGo = false
      this.assign('content', '该订单已使用或已退款'); 
      return this.display('api/weixin_index'); 
    }
    
    if (letGo) {
      console.log(new Date())
      await voucherModel.where({code:data.state}).update({status:1,end_time:new Date()})
      const voucherLeft = await voucherModel.where({order_id:voucherInfo.order_id,status:0}).find()
      
      if (think.isEmpty(voucherLeft)) {
        await orderModel.where({id:voucherInfo.order_id}).update({order_status:301})
      }
      
      this.assign('content', '核销成功'); 
      return this.display('api/weixin_index'); 
    }
  }
};
