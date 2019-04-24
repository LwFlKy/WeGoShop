module.exports = class extends think.Controller {
  async __before() {
    // 根据token值获取用户id
    think.token = this.ctx.header['x-wegoshop-token'] || '';
    const tokenSerivce = this.service('token', 'common', this.ctx);;
    const controllerAction = this.ctx.module +  '/' + this.ctx.controller + '/' + this.ctx.action;
    think.userId = await tokenSerivce.getUserId();
    
    if (think.userId <= 0 && this.ctx.controller !== 'auth') {
      return this.fail(401, '请先登录');
    } else {
      if (this.ctx.controller !== 'auth') {
        const authorityService = think.service('admin/authority', 'client'); // 创建客户端service对象 
        
        if (!await authorityService.authorityCheck(think.userId, controllerAction)) { // 调用客户端校验函数
          return this.fail(403, '无权限访问该模块');
        }
        
      }
    }
  }
};
