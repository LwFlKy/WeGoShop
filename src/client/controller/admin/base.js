module.exports = class extends think.Controller {
  async __before() {
    // 根据token值获取用户id
    think.token = this.ctx.header['x-wegoshop-token'] || '';
    const tokenSerivce = think.service('token','common',this.ctx);
    think.userId = await tokenSerivce.getUserId();
    const authorityService = think.service('admin/authority', 'client');
    const controllerAction = this.ctx.controller + '/' + this.ctx.action;
    if (await authorityService.authorityCheck(think.userId, controllerAction)) {
      if (think.userId <= 0) {
        return this.fail(401, '请先登录');
      }
    }else {
      return this.fail(403, '无权限访问该模块');
    }
  }
};
