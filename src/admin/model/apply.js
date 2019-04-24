module.exports = class extends think.Mongo {
  async getApply(type, page = 1) {
    const mongodb = think.mongo('apply', 'mongo');
    const data = await mongodb.where({type: type, status: 0}).order({timestamp: 1}).page(page).countSelect();
    if (type === 'goods') {
      for (var i = data.data.length - 1; i >= 0; i--) {
        data.data[i] = Object.assign(data.data[i], await think.model('promotion').where({id: data.data[i].promotion_id}).find());
        data.data[i].gallery = await think.model('promotion_gallery').where({promotion_id: data.data[i].promotion_id}).select();
      }
    }
    return data;
  }

  async addApply(shopid, type, content = 'empty', cover = false) {
    const mongodb = think.mongo('apply', 'mongo');
    const data = {shopid: shopid, type: type, status: 0, timestamp: parseInt(Date.parse(new Date()) / 1000)};
    if (content !== 'empty') {
      data.content = content;
    }
    ;
    const result = await mongodb.thenAdd(data, {shopid: shopid, type: type});

    if (result.type === 'add') {
      return true;
    } else {
      if (cover) {
        await mongodb.where({shopid: shopid, type: type}).update({content: data.content, status: 0, timestamp: parseInt(Date.parse(new Date()) / 1000)});
        return true;
      }
      return false;
    }
  }

  async addGoodsApply(shopid, promotion_id) {
    const mongodb = think.mongo('apply', 'mongo');
    const data = {shopid: shopid, promotion_id: promotion_id, type: 'goods', status: 0, timestamp: parseInt(Date.parse(new Date()) / 1000)};
    ;
    const result = await mongodb.thenAdd(data, {shopid: shopid, promotion_id, promotion_id, type: 'goods'});

    if (result.type == 'add') {
      return true;
    } else {
      await mongodb.where({shopid: shopid, promotion_id, promotion_id, type: 'goods'}).update({status: 0, timestamp: parseInt(Date.parse(new Date()) / 1000)});
      return true;
    }
  }

  async removeApply(_id) {
    const mongodb = think.mongo('apply', 'mongo');
    const result = await mongodb.where({_id: _id}).delete();
    return result;
  }
};
