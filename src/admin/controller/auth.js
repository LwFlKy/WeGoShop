const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    
    const username = this.post('username');
    const password = this.post('password');

    const admin = await this.model('auth').getUserInfo(username);

    if (think.isEmpty(admin)) {
      return this.fail(401, '用户名或密码不正确1');
    }

    if (think.md5(password + '' + admin.password_salt) !== admin.password) {
      return this.fail(400, '用户名或密码不正确2');
    }

    // 更新登录信息
    this.model('auth').updateLoginInfo(admin.id, this.ctx.ip);

    const TokenSerivce = this.service('token', this.ctx);
    const sessionKey = await TokenSerivce.create({
      user_id: admin.id
    });

    if (think.isEmpty(sessionKey)) {
      return this.fail('登录失败');
    }
    // 从client/admin获取菜单路由，重新开发需注意适配。
    const authority = await this.model('admin/authority', {}, 'client').getAuthorityByGroup(admin.admin_role_id);

    const userInfo = {
      id: admin.id,
      username: admin.username,
      avatar: admin.avatar,
      admin_role_id: admin.admin_role_id,
      authority: authority,
      init: admin.init,
      shop_id: admin.shop_id
    };

    return this.success({ token: sessionKey, userInfo: userInfo });
  }

  async verifyAction() {
    const tokenSerivce = this.service('token', this.ctx);
    if (think.token === 'false') {
      return this.fail(401, '未登录');
    } else {
      const adminInfo = await tokenSerivce.getUserInfo();
      return this.success({ token: think.token,
        userInfo: {
          id: adminInfo.id,
          username: adminInfo.username,
          avatar: adminInfo.avatar,
          admin_role_id: adminInfo.admin_role_id,
          authority: adminInfo.authority,
          init: adminInfo.init,
          shop_id: adminInfo.shop_id
        }});
    }
  }

  async checkAdminAction() {
    var value = this.post();
    const adminModel = this.model('admin');
    return this.success(await adminModel.where(value).select());
  }

  async modifyAction() {
    var values = this.post();
    const tokenSerivce = think.service('token', 'common', this.ctx);
    const adminInfo = await tokenSerivce.getUserInfo();
    const adminModel = this.model('admin');
    if (adminInfo.init === 0) {
      values.password = think.md5(values.newPassword + '' + adminInfo.password_salt);
      delete values.newPassword;
      values.init = 1;
      await adminModel.where({id: adminInfo.id}).update(values);
      return this.success();
    } else {
      if (think.md5(values.oldPassword + '' + adminInfo.password_salt) === adminInfo.password) {
        values.password = values.newPassword;
      }
    }
    await adminModel.where({id: adminInfo.id}).update(values);
    return this.success();
  }
};
