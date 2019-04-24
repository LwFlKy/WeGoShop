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

    const model = this.model('promotion');
    const data = {
      ApplyData:await model.where({name: ['like', `%${name}%`],shop_id: ['like', `%${shop_id}%`],is_delete: ['like', `0`],is_on_sale: ['like', `0`]}).order(['id DESC']).select(),
      GoliveData:await model.where({name: ['like', `%${name}%`],shop_id: ['like', `%${shop_id}%`],is_delete: ['like', `0`],is_on_sale: ['like', `1`]}).order(['id DESC']).select()
    }

    return this.success(data);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('promotion');
    const data = await model.where({id: id}).find();

    return this.success(data);
  }

  async delGalleryItemAction() {
    const id = this.post('promotion_id');
    const img_url = this.post('img_url');
    const gallery_model = this.model('promotion_gallery');
    let gallery = await gallery_model.where({promotion_id: id,img_url:img_url}).delete();

    return this.success(gallery);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    let values = this.post();
    let id = this.post('id');
    const picUrl = "http://p9dkk6pbv.bkt.clouddn.com/"
    const model = this.model('promotion');
    const galleryModel = this.model('promotion_gallery');
    let galleryMap = []
    values.primary_pic_url = "http://p9dkk6pbv.bkt.clouddn.com/"+values.primary_pic_url
    const shop_id = values.shop_id
    values.is_on_sale = values.is_on_sale ? 1 : 0;
    let gallery = []
    values.content = JSON.stringify(values.content)
    if (id > 0) {
      await model.where({id: id}).update(values);
      values.is_on_sale = 0
      let result = await this.mongo('apply', 'mongo').addGoodsApply(values.shop_id,id,"goods")
    } else {
      delete values.id;
      id = await model.add(values);
      let result = await this.mongo('apply', 'mongo').addGoodsApply(values.shop_id,id,"goods")
    }
    if (!think.isEmpty(values.gallery)) {
      let FileList = []
      for (var i = values.gallery.length - 1; i >= 0; i--) {
        FileList.push(values.gallery[i])
        gallery.push({promotion_id:id,img_url:"shopPrimaryPic/promotion/"+id+"/"+shop_id+"/"+values.gallery[i].slice(-32)})
      }
      await this.model('qiniu').moveFile("shopPrimaryPic/promotion/"+id+"/"+shop_id,FileList)
      await galleryModel.addMany(gallery)
    }
    return this.success(values);
  }

  async destoryAction() {
    const model = this.model('promotion');
    const values = this.post();
    const id = this.post('id');
    let gallery = await this.model('promotion_gallery').where({promotion_id: id}).select()
    for (var i = gallery.length - 1; i >= 0; i--) {
      await this.model('qiniu').deletePic(gallery[i].img_url)
    }
    await this.mongo('apply','mongo').where({promotion_id: id}).delete();
    await this.model('promotion_gallery').where({promotion_id: id}).delete();
    /*await this.model('promotion_gallery').where({shop_id: id}).delete();*/
    await model.where({id: id}).update(values);
    // TODO 删除图片

    return this.success(gallery);
  }
};
