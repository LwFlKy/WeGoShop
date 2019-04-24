const Base = require('./base.js');

module.exports = class extends Base {
  //
  // 添加商户信息修改申请
  //
  async addShopModifyApplyAction() {
    const apply = this.model('apply', 'mongo');
    let result = {};
    if (think.isEmpty(this.post('content'))) {
      result = await apply.addApply(this.post('shop_id'), this.post('type'));
    } else {
      result = await apply.addApply(this.post('shop_id'), this.post('type'), this.post('content'));
    }
    if (result) {
      return this.success();
    } else {
      return this.fail();
    }
  }

  async getApplyAction() {
    const apply = this.model('apply', 'mongo');
    let page = this.post('page');

    if (think.isEmpty(page)) {
      page = 1;
    }
    const result = await apply.getApply(this.post('type'), page);
    return this.success(result);
  }

  //
  // 获取商户的申请信息
  //

  async getApplyItemAction() {
    const apply = this.mongo('apply', 'mongo');
    const result = await apply.where({shopid: this.post('shopid'), type: this.post('type')}).find();
    
    if (think.isEmpty(result)) {
      return this.fail();
    } else {
      return this.success(result);
    }
  }

  async addShopGoliveApplyAction() {
    let data = this.post();
    const type = data.type;
    
    data.loc = {type:"Point",coordinates:[data.long,data.lat]}
    delete data.type;
    const apply = this.model('apply');
    const result = await apply.addApply(data.id, type, data, true);
    if (result) {
      return this.success();
    } else {
      return this.fail();
    }
  }

  async passGoodsApplyAction() {
    const applyData = await this.mongo('apply', 'mongo').where({_id: this.post('_id')}).find();
    await this.model('promotion').where({id: applyData.promotion_id}).update({is_on_sale: 1});
    const weixin = this.service('weixin', 'admin');
    await this.mongo('apply', 'mongo').where({_id: this.post('_id')}).delete();
    const shop_id = await this.model('admin').where({shop_id: applyData.shopid}).field('weixin_openid').select();
    const datetime = new Date();
    for (var i = shop_id.length - 1; i >= 0; i--) {
      weixin.sendTmpMsg(shop_id[i].weixin_openid, 'MCI479I_7znAak6dVjS-vFeG9f3QjA9WNW7e7YmDe7E', {
        first: {
          value: '您的商品的上架申请已处理'
        },
        keyword1: {
          value: '申请通过'
        },
        keyword2: {
          value: datetime.toLocaleDateString() + ' ' + datetime.toLocaleTimeString()
        },
        remark: {
          value: '商品已上架！'
        }
      });
    }
  }

  async rejectApplyAction() {
    const mongodb = think.mongo('apply', 'mongo');
    const applyData = await mongodb.where({_id: this.post('_id')}).find();
    if (applyData.type === 'modify') {
      await mongodb.where({_id: this.post('_id')}).delete();
    } else {
      await mongodb.where({_id: this.post('_id')}).update({status: 1});
    }
    const shop_id = await this.model('admin').where({shop_id: applyData.shopid}).field('weixin_openid').select();
    const datetime = new Date(applyData.timestamp * 1000);
    const weixin = this.service('weixin', 'admin');

    let content = '';
    if (applyData.type === 'goods') {
      content = '商品上架';
    } else if (applyData.type === 'modify') {
      content = '商户修改';
    } else if (applyData.type === 'golive') {
      content = '商户上线';
    }
    let result = '';
    for (var i = shop_id.length - 1; i >= 0; i--) {
      result = await weixin.sendTmpMsg(shop_id[i].weixin_openid, '8H8-ZLPZ6m-cxnB38Ka-MtYYJVls11aSnyJ5fcy_ADQ', {
        first: {
          value: '您的' + content + '申请被拒绝'
        },
        keyword1: {
          value: this.post('reason')
        },
        keyword2: {
          value: datetime.toLocaleDateString() + ' ' + datetime.toLocaleTimeString()
        },
        remark: {
          value: '请登录后台修改申请资料，或重新申请！'
        }
      });
    }
    return this.success();
  }

  async passShopModifyApplyAction() {
    const shop_name = await think.mongo('shopInfo', 'mongo').where({_id: this.post('shop_id')}).field('name');
    await think.mongo('shopInfo', 'mongo').where({_id: this.post('shop_id')}).update({allowHandle: {modify: true, show: false}});
    const apply = await this.mongo('apply', 'mongo').where({shopid: this.post('shop_id'), type: 'modify'}).delete();
    // const weixin = this.service('weixin', 'admin');
    const shop_id = await this.model('admin').where({shop_id: this.post('shop_id')}).field('weixin_openid').select();
    const datetime = new Date();
    /* for (var i = shop_id.length - 1; i >= 0; i--) {
      weixin.sendTmpMsg(shop_id[i].weixin_openid, 'MCI479I_7znAak6dVjS-vFeG9f3QjA9WNW7e7YmDe7E', {
        first: {
          value: '您的店铺"' + shop_name + '"的修改申请已处理'
        },
        keyword1: {
          value: '申请通过'
        },
        keyword2: {
          value: datetime.toLocaleDateString() + ' ' + datetime.toLocaleTimeString()
        },
        remark: {
          value: '商户已下线，请尽快进入后台修改信息，提交审核，通过审核后即可重新上线！'
        }
      });
    } */
  }

  async passShopGoliveApplyAction() {
    const applyData = await this.mongo('apply', 'mongo').where({_id: this.post('_id')}).find();
    const galleryModel = this.model('shop_gallery');
    const shopModel = think.mongo('shopInfo', 'mongo');
    const weixin = this.service('weixin', 'admin');
    const values = applyData.content;
    
    values.shop_stat.can_modify = false;
    values.shop_stat.is_show = true;
    values.shop_stat.is_init = true;
    values.allowHandle.modify = false;

    values.loc = {type:"Point",coordinates:[values.long,values.lat]}

    delete values._id
    await shopModel.where({_id: applyData.shopid}).update(applyData.content);
    const gallery = [];
    await galleryModel.where({shop_id: applyData.shopid}).delete();
    if (!think.isEmpty(values.gallery)) {
      for (var i = values.gallery.length - 1; i >= 0; i--) {
        gallery.push({shop_id: applyData.shopid, img_url: values.gallery[i]});
      }
      await galleryModel.addMany(gallery);
    }
    await this.mongo('apply', 'mongo').where({_id: this.post('_id')}).delete();
/*
    const weixin_openid = await this.model('admin').where({shop_id: applyData.shopid}).field('weixin_openid').select();
    const datetime = new Date();
    for (var i = weixin_openid.length - 1; i >= 0; i--) {
      weixin.sendTmpMsg(weixin_openid[i].weixin_openid, 'MCI479I_7znAak6dVjS-vFeG9f3QjA9WNW7e7YmDe7E', {
        first: {
          value: '您的店铺"' + applyData.content.name + '"的上线申请已处理'
        },
        keyword1: {
          value: '申请通过'
        },
        keyword2: {
          value: datetime.toLocaleDateString() + ' ' + datetime.toLocaleTimeString()
        },
        remark: {
          value: '商户信息审核通过，已上线！'
        }
      });
    }*/
    return this.success();
  }
};
