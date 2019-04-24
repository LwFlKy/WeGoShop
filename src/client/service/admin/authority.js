module.exports = class extends think.Service {
  /*
    权限检测
    return @boolean
  */
  async authorityCheck(userId, controllerAction) {
    const menuAction = think.config('admin', undefined, 'client').menuAction;
    const groupId = await think.model('admin').where({id: userId}).getField('admin_role_id');
    const authority = await think.model('admin/authority', {}, 'client').getAuthorityByGroup(groupId, 'flat');
    console.log(authority,controllerAction)
    for (let index = 0; index < authority.length; index++) {
      if (!think.isEmpty(menuAction[authority[index]])) {
        if (!think.isEmpty(menuAction[authority[index]]) && menuAction[authority[index]].includes(controllerAction)) {
          return true;
        }
      }
    }
    return false;
  }
};
