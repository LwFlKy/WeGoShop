module.exports = class extends think.Model {
  /**
   * 获取购物车的商品
   * @returns {Promise.<*>}
   */
  async getVoucherData(handle) {
    const voucher_model = await think.model('voucher')
    return (await voucher_model.alias('voucher').join({
      table: 'order',
      join: 'left',
      as: 'order',
      on: ['voucher.order_id', 'order.id']
    }).join({
      table: 'shop',
      join: 'left',
      as: 'shop',
      on: ['order.shop_id', 'shop.id']
    }).field('`voucher`.`id`,`shop`.`name`,shop_id ,(`order`.`order_price`/`order`.`num`)AS`fee`,`voucher`.`end_time`')).where(handle).select()
  }

};
