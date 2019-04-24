const Base = require('./base.js');

module.exports = class extends Base {
  async getVoucherDataAction() {
    const model = this.model('data');
    let data = this.post()
    let handle = {'voucher.status' : 1}
    
    if (data.hasOwnProperty("status")) {
      handle['voucher.status'] = this.post("status")
    }

    if (data.hasOwnProperty("time")) {
      let time = this.post("time")
      time[1] = new Date(new Date(time[1]).getTime() + 3600 * 1000 * 24).toLocaleDateString()
      handle.end_time = {">=":time[0],"<":time[1]}
    }

    if (!think.isEmpty(this.post("searchText"))) {
      handle["shop.name"] = ['like', '%'+this.post("searchText")+'%']
    }

    
    return this.success(await model.getVoucherData(handle))
  }
};
