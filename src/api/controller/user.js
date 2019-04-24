const Base = require('./base.js');
const fs = require('fs');
const _ = require('lodash');
const crypto = require('crypto');
const md5 = require('md5');

module.exports = class extends Base {
  async infoAction() {
    const userInfo = await this.model('user').where({mobile: '15989389319'}).find();
    delete userInfo.password;
    return this.json(userInfo);
  }

  async getShopOwnStateAction() {
    console.log(think.userId)
    const result = await this.model("shop").where({owner_id:think.userId}).find()
    return this.success(!think.isEmpty(result))
  }

  async getPhoneNumberAction(){
    const TokenSerivce = this.service('token', 'common', this.ctx);
    const sessionKey = await TokenSerivce.getSessionKey()
    const WeixinSerivce = this.service('weixin', 'api');
    return this.success(await WeixinSerivce.decryptUserInfoData(sessionKey, this.post("encryptedData"), this.post("iv")))
  }

  async getPointAction() {
    const point = await this.model('user').where({id:think.userId}).getField("point");
    return this.success(point);
  }

  async getRechargeRecordAction() {
    let openid = await this.model("user").where({id:think.userId}).getField("miniprogram_openid")
    let rechargeRecord = await this.mongo("pay_result",'mongo').where({openid:openid[0],result_code:"SUCCESS",return_code:"SUCCESS"}).page(this.get("page") || 1,20).countSelect()
    return this.success(rechargeRecord)
  }
  /**
   * 保存用户头像
   * @returns {Promise.<void>}
   */
  async saveAvatarAction() {
    const avatar = this.file('avatar');
    if (think.isEmpty(avatar)) {
      return this.fail('保存失败');
    }

    const avatarPath = think.RESOURCE_PATH + '/static/user/avatar/1.' + _.last(_.split(avatar.path, '.'));

    fs.rename(avatar.path, avatarPath, function(res) {
      return this.success();
    });
  }
};
