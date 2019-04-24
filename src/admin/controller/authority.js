const Base = require('./base.js');
/*
    权限管理模块
*/
module.exports = class extends Base {
  /* async setGroup() {
    const type = this.post("type")
    const apply = this.mongo('apply', 'mongo');
    let result = {}
    if (think.isEmpty(this.post("content"))) {
      result = await apply.addApply(this.post("shop_id"),this.post("type"))
    }else{
      result = await apply.addApply(this.post("shop_id"),this.post("type"),this.post("content"))
    }
    if (result) {
      return this.success()
    }else{
      return this.fail()
    }
  } */

  async getGroupInfoAction() {
    const allGroupInfo = await this.model("authority").getAllGroupInfo();
    return this.success(allGroupInfo);
  }

  async groupModifyAction() {
    const result = await this.model("config_group").where({id: this.post("id")}).update({content: JSON.stringify(this.post("content")),name: this.post("name")});
    return this.success(result);
  }
};
