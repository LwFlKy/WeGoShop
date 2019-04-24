const Base = require('./base.js');

module.exports = class extends Base {
  /*
    Action：/client/admin/getGroupInfo
    Function: 获取分组信息
  */
  async getGroupInfoAction() {
    const allGroupInfo = await this.model('admin/authority', {}, 'client').getAllGroupInfo();
    return this.success(allGroupInfo);
  }

  /*
    Action：/client/admin/groupModify
    Function: 修改分组信息
  */
  async groupModifyAction() {
    const result = await this.model('group', 'admin').where({id: this.post('id')}).update({content: JSON.stringify(this.post('content')), name: this.post('name')});
    return this.success(result);
  }

  /*
    Action：/client/admin/groupAdd
    Function: 添加新分组
  */
  async groupAddAction() {
    const result = await this.model('group', 'admin').add({content: JSON.stringify(this.post('content')), name: this.post('name')});
    return this.success(result);
  }
};
