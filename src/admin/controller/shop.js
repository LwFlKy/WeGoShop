const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const para = {
      page: this.get('page') || 1,
      size: this.get('size') || 10,
      name: this.get('name') || ''
    };

    const model = this.model('shop');
    const data = await model.getShopInfo(para);

    return this.success(data);
  }

  async infoAction() {
    const id = this.get('id');
    const shopModel = think.mongo('shopInfo', 'mongo');
    const galleryModel = this.model('shop_gallery');
    const gallery = await galleryModel.where({shop_id: id}).select();
    const data = await shopModel.where({_id: id}).find();
    data.gallery = [];
    if (gallery.length !== '') {
      for (var i = gallery.length - 1; i >= 0; i--) {
        data.gallery.push(gallery[i].img_url);
      }
    }
    data.handle = {
      modify: false,
      apply_modify: false
    };
    if (data.allowHandle.modify === true) {
      data.handle.modify = true;
    } else {
      data.handle.apply_modify = true;
    }
    data.id = data._id;
    
    return this.success(data);
  }

  async delGalleryItemAction() {
    const id = this.post('shop_id');
    const imgUrl = this.post('img_url');
    const galleryModel = this.model('shop_gallery');
    const gallery = await galleryModel.where({shop_id: id, img_url: imgUrl}).delete();

    return this.success(gallery);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }
    const values = this.post();
    const _id = this.post('_id');
    delete values._id;

    if (!think.isEmpty(_id)) {
      await this.model('shop').updateShopInfo(values, _id);
    } else {
      await this.model('shop').addShop(values);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await think.mongo('shopInfo', 'mongo').where({_id: id}).limit(1).delete();
    await this.model('admin').where({shop_id: id}).delete();
    // TODO 删除图片

    return this.success();
  }
};
