const Base = require('./base.js');
const fs = require('fs');

module.exports = class extends Base {
  async shopPicAction() {
    const shopFile = this.file('shop_pic');
    if (think.isEmpty(shopFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/shop/' + think.uuid(32) + '.jpg';
    const is = fs.createReadStream(shopFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'shop_pic',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }

  async shopNewPicAction() {
    const shopFile = this.file('shop_new_pic');
    if (think.isEmpty(shopFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/shop/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(shopFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'shop_new_pic',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }

  async categoryWapBannerPicAction() {
    const imageFile = this.file('wap_banner_pic');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/category/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'wap_banner_url',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }

  async topicThumbAction() {
    const imageFile = this.file('scene_pic_url');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/topic/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'scene_pic_url',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }
};
