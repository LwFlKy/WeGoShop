// default config
module.exports = {
  /*
  * 各个client的config
  */
  admin:{
    // 管理平台系统中各个页面所需访问的action
    menuAction: {
      RechargeItemManage:[
        'admin/recharge/itemList',
        'admin/recharge/itemDel',
        'admin/recharge/itemAdd',
        'admin/recharge/itemModify'
      ],
      GoodsApplyManage:[
        "admin/apply/getApply",
        'admin/apply/passGoodsApply',
        'admin/apply/getApply',
        'admin/category',
        'admin/apply/rejectApply'
      ],
      PromotionManage:[
        'admin/promotion',
        'admin/promotion/index',
        'admin/qiniu/delete',
        'admin/promotion/delGalleryItem',
        'admin/qiniu/moveFile',
        'admin/promotion/store',
        'admin/promotion/destory',
      ],
      GoliveApplyManage: [
        'admin/apply/passShopGoliveApply',
        'admin/apply/getApply',
        'admin/apply/rejectApply',
        'admin/category/index'
      ],
      GroupManage: [
        'admin/authority/getGroupInfo',
        'admin/authority/groupModify',
        'admin/authority/groupAdd'
      ],
      ShopManage: [
        'admin/shop/index',
        'admin/shop/store',
        'admin/shop/destory'
      ],
      CategoryManage: [
        'admin/category/index',
        'admin/category/store',
      ],
      ShopInfoManage: [
        'admin/shop/info',
        'admin/shop/index',
        'admin/shop/delGalleryItem',
        'admin/apply/addShopGoliveApply',
        'admin/apply/getApplyItem',
        'admin/apply/addShopModifyApply',
        'admin/category/index',
        'admin/qiniu/moveFile',
        'admin/qiniu/delete',
        'admin/qiniu/uploadToken',
        'admin/qiniu/picList'
      ],
      ModifyApplyManage: [
        'admin/apply/rejectApply',
        'admin/apply/passShopModifyApply',
        'admin/apply/getApply'
      ],
      RechargeRecordManage: [
        'admin/recharge/recordList'
      ]
    }
  }
};
