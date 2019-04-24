/* eslint-disable no-multi-spaces */
const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 获取支付的请求参数
   * @returns {Promise<PreventPromise|void|Promise>}
   */
  async prepayAction() {
    const rechargeId = this.post('id');
    const rechargeItem = await this.model('recharge').where({ id: rechargeId }).find();
    const rechargeStr = JSON.stringify(rechargeItem)
    const sn = this.model("order").generateOrderNumber()
    const openid = await this.model('user').where({ id: think.userId }).getField('miniprogram_openid', true);
    if (think.isEmpty(openid)) {
      return this.fail('微信支付失败1');
    }
    const WeixinSerivce = this.service('weixin', 'api');
    try {
      const returnParams = await WeixinSerivce.createUnifiedOrder({
        openid: openid,
        body: '订单编号：' +sn,
        out_trade_no:sn,
        total_fee: parseInt(rechargeItem.fee * 100),
        attach: rechargeStr,
        spbill_create_ip: ''
      });
      return this.success(returnParams);
    } catch (err) {
      return this.fail(err);
    }
  }

  async notifyAction() {
    const WeixinSerivce = this.service('weixin', 'api');
    const result = WeixinSerivce.payNotify(this.post('xml'));
    const mongo = this.mongo("pay_result", "mongo")
    let content = "" 
    console.log(result)
    if (!result) {
      content = `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[支付失败]]></return_msg></xml>`;
    }else{
      mongo.add(result)
      const data = await mongo.where({out_trade_no:'20180603021806136466'}).find()
      if (think.isEmpty(data)) {
        const rechargeInfo = JSON.parse(result.attach)
        this.model("user").where({miniprogram_openid: result.openid}).increment("point",rechargeInfo.point)
      }
      content = `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`;
    }
    this.assign('content', content); 
    return await this.display('api/weixin_index');
  }
};
