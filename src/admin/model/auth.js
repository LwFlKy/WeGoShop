module.exports = class extends think.Model {
  /**
     * 获取后台用户信息
     * @returns {Promise.<*>}
     */
  async getUserInfo(username) {
    const admin = await this.model('admin').where({ username: username }).find();
    return admin;
  }

  /**
     * 更新登录信息
     * @returns {Promise.<*>}
     */
  async updateLoginInfo(id, ip) {
    await this.model('admin').where({ id: id }).update({
      last_login_time: parseInt(Date.now() / 1000),
      last_login_ip: ip
    });
  }
};
