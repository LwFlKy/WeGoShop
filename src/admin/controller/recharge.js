const Base = require('./base.js');

module.exports = class extends Base {
  async itemListAction() {
    const item = await this.model("recharge").order({fee:-1,point:-1}).select()
    return this.success(item)
  }

  async itemAddAction() {
    const data = this.post()
    delete data.id
    const item = await this.model("recharge").add(data)
    return this.success(item)
  }

  async itemDelAction() {
    const id = this.post("id")
    const item = await this.model("recharge").where({id:id}).delete()
    return this.success(item)
  }

  async itemModifyAction() {
    let data = this.post()
    const id = data.id
    delete data.id
    const item = await this.model("recharge").where({id:id}).update(data)
    return this.success(item)
  }

  async recordListAction() {
    let data = await this.mongo("pay_result", "mongo").order({out_trade_no:1}).page(this.get('page'),10).countSelect();
    return this.success(data)
  }


};