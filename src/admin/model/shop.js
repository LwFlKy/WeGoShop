module.exports = class extends think.Model {
  async getShopInfo(parameter = {}, type = '') {
    const shopMongoModel = think.mongo('shopInfo', 'mongo');
    let result;
    switch (type) {
      case 'search':
        result = await shopMongoModel.field(['name,shop_stat.is_show']).where({'name': {$regex: `${parameter.name}`, $options: 'i'}}).order({
          id: 'DESC',
          name: 'ASC'
        }).page(parameter.page, parameter.size).countSelect();
        break;

      default:
        result = await shopMongoModel.field('name,shop_stat.is_show').where({'name': {$regex: `${parameter.name}`, $options: 'i'}}).order({
          id: 'DESC',
          name: 'ASC'
        }).page(parameter.page, parameter.size).countSelect();
        break;
    }
    if (think.isEmpty(type)) {
    }
    return result;
  }

  async addShop(values) {
    const shopModel = think.mongo('shopInfo', 'mongo');
    const adminModel = think.model('admin');
    values.createTime = Date.parse(new Date());

    values.shop_stat.is_show = false;
    values.shop_stat.is_init = false;

    values.allowHandle = {
      'modify': true
    };
    let id = await shopModel.add(values);
    const salt = randomString(6);
    const adminInfo = {
      password: think.md5('admin' + '' + salt),
      password_salt: salt,
      admin_role_id: 2,
      shop_id: id
    };
    id = await adminModel.add(adminInfo);
    adminModel.where({id: id}).update({username: id});
  }

  async updateShopInfo(values, id) {
    values.updateTime = Date.parse(new Date());
    const shopModel = think.mongo('shopInfo', 'mongo');
    const galleryModel = think.mongo('shopGallery', 'mongo');
    await shopModel.where({_id: id}).update(values);
    const gallery = [];
    // const coordinates = await mongodb.where({shop_id: id}).find();
    /* if (JSON.stringify(coordinates) !== '{}') {
      await mongodb.where({shop_id: id}).update({loc: {type: 'Point', coordinates: [values.longitude, values.latitude]}, type_id: values.type_id, parent_type_id: values.parent_type_id, is_show: values.is_show});
    } else {
      await mongodb.add({loc: {type: 'Point', coordinates: [values.longitude * 1, values.latitude * 1]}, name: values.name, shop_id: id, type_id: values.type_id, parent_type_id: values.parent_type_id, is_show: values.is_show});
    } */
    if (!think.isEmpty(values.gallery)) {
      for (var i = values.gallery.length - 1; i >= 0; i--) {
        gallery.push({shop_id: id, img_url: values.gallery[i]});
      }
      await galleryModel.addMany(gallery);
    }
  }
};
