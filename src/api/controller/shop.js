const Base = require('./base.js');

module.exports = class extends Base {
  async listAction() {
    const mongodb = think.mongo('shopInfo', 'mongo');
    const keyword = this.get('keyword')
    let data = this.get()
    console.log("aaaaaaaaaaaaaaaa",data.loc)
    let handle = {
      /*shop_stat:{
        is_show:1
      }*/
    }
    console.log(data)
    if (think.isEmpty(data.loc)) {
      delete data.loc
    }else{
      data.loc = JSON.parse(data.loc)
      handle.loc = {
      $near: {
          $geometry:{type: "Point",coordinates: [data.loc.longitude,data.loc.latitude]}
        }
      }
    }

    if (!think.isEmpty(this.get('type_id'))) {
      if (data.type_id == '0' && data.parent_type_id !== "0") {
        handle.parent_type_id = parseInt(data.parent_type_id)
      }else if(data.type_id !== '0'){
        handle.type_id = parseInt(data.type_id)
      }
    }

    if (!think.isEmpty(this.get('keyword'))) {
      handle['name'] = {$regex:new RegExp(keyword,"gim")}
    }

    console.log(handle)
    data = await mongodb.where(handle).field(['shop_id', 'name', 'logo_url','loc']).page(this.get('page') || 1, this.get('size') || 10).select();

    for (var i = data.length - 1; i >= 0; i--) {
        data[i].id = data[i].shop_id
        data[i].coordinates = {latitude:data[i].loc.coordinates[1],longitude:data[i].loc.coordinates[0]}
    }


    return this.success(data);
  }

  async detailAction() {
    const mongodb = think.mongo('shopInfo', 'mongo');
    const gallery = this.model('shop_gallery');
    const data = await mongodb.where({_id: this.get('id')}).find();
    data.gallery = await gallery.where({shop_id: this.get('id')}).select();
    data.coordinates = {latitude:data.loc.coordinates[1],longitude:data.loc.coordinates[0]}

    return this.success({shop: data});
  }

  async enteringApplyAction(){
    const shopModel = this.model('shop');
    const adminModel = this.model('admin');


    const values = {name:this.post("shop_name"),owner_id:this.post("userId"),owner_name:this.post("owner_name")}
    let id = await shopModel.add(values);
    const salt = randomString(6)
    const adminInfo = {
      password:think.md5("admin"+""+salt),
      password_salt:salt,
      admin_role_id:3,
      shop_id:id,
      phoneNum:this.post("phoneNum")
    }
    const username_id = await adminModel.add(adminInfo)
    await adminModel.where({id: username_id}).update({username:username_id})

    return this.success(this.post())
  }
};
