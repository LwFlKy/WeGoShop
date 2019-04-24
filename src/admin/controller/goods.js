const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 10;
    const name = this.get('name') || '';
    const shop_id = this.get('shop_id') || '';

    const model = this.model('goods');
    const data = await model.where({name: ['like', `%${name}%`],shop_id: ['like', `%${shop_id}%`],is_delete: ['like', `0`]}).order(['id DESC']).page(page, size).countSelect();

    return this.success(data);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('goods');
    const data = await model.where({id: id}).find();

    return this.success(data);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    let id = this.post('id');
    const picUrl = "http://p9dkk6pbv.bkt.clouddn.com/"
    const model = this.model('goods');
    const galleryModel = this.model('goods_gallery');
    let galleryMap = []
    values.primary_pic_url = "http://p9dkk6pbv.bkt.clouddn.com/"+values.primary_pic_url
    const shop_id = values.shop_id
    let list_pic_url = null
    if (values.list_pic_url) {
      list_pic_url = values.list_pic_url.split(",")
      values.list_pic_url = values.primary_pic_url
    }
    values.is_on_sale = values.is_on_sale ? 1 : 0;
    values.is_new = values.is_new ? 1 : 0;
    values.is_hot = values.is_hot ? 1 : 0;
    if (id > 0) {
      await model.where({id: id}).update(values);
    } else {
      delete values.id;
      id = await model.add(values);
    }
    if (values.list_pic_url) {
      for (var i = list_pic_url.length - 1; i >= 0; i--) {
        galleryMap.push({goods_id:id,img_url:picUrl+list_pic_url[i],sort_order:5})
      }
      await galleryModel.where({id: id}).delete();
      await galleryModel.addMany(galleryMap);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('goods').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
