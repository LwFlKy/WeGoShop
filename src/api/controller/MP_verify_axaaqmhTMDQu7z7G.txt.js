const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 获取用户的收货地址
   * @return {Promise} []
   */
  indexAction(){
    this.assign('content', 'axaaqmhTMDQu7z7G'); 
    return this.display('api/weixin_index'); 
  }
};
