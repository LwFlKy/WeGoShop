module.exports = class extends think.Model {
  /*
    从数据库中获取指定分组权限
    return @Object
  */
  async getAuthorityByGroup(groupId, type = 'normal') {
    const authorityData = await think.model('group', 'admin').where({ id: groupId }).find();
    if (typeof (authorityData.content) === 'string') {
      authorityData.content = JSON.parse(authorityData.content);
    }
    if (type === 'flat') {
      const flatArray = [];
      Object.keys(authorityData.content).forEach((key) => {
        if (authorityData.content[key].type === 'single') {
          flatArray.push(key);
        } else if (authorityData.content[key].type === 'multiple') {
          Object.keys(authorityData.content[key].submenu).forEach((subkey) => {
            flatArray.push(subkey);
          });
        }
      });
      return flatArray;
    } else if (type === 'normal') {
      return authorityData;
    }
  }
  
  /*
    从数据库中获取所有分组权限
    return @Object
  */
  async getAllGroupInfo() {
    const allGroupData = await think.model('group', 'admin').select();
    console.log(allGroupData)
    return allGroupData;
  }
};
