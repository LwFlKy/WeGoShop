const Base = require('./base.js');

module.exports = class extends Base {
  async listAction() {
    const model = this.model('promotion');
    const gallery = this.model('promotion_gallery');
    const shop_id = this.get('shop_id')
    let data = ""
    if (shop_id) {
      data = await model.where({shop_id:shop_id,is_delete:0}).field(['id', 'name', 'promotion_brief', 'price']).page(this.get('page') || 1, this.get('size') || 10).countSelect();
    }else{
      data = await model.field(['id', 'name', 'promotion_brief', 'price']).page(this.get('page') || 1, this.get('size') || 10).countSelect();
    }

    for (var i = data.data.length - 1; i >= 0; i--) {
      let img_url = await gallery.where({promotion_id:data.data[i].id}).find()
      data.data[i].img_url = img_url.img_url
    }


    return this.success(data);
  }

  async detailAction() {
    const model = this.model('promotion');
    const gallery = this.model('promotion_gallery');
    const data = await model.where({id: this.get('id')}).find();
    data.content = JSON.parse(data.content)
    data.gallery = await gallery.where({promotion_id: this.get('id')}).select();

    return this.success(data);
  }
};
