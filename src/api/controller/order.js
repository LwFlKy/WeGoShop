const Base = require('./base.js');
const moment = require('moment');

module.exports = class extends Base {
  /**
   * 获取订单列表
   * @return {Promise} []
   */
  async listAction() {
    console.log(this.get('page'))
    const orderList = await this.model('order').where({ user_id: think.userId }).order(['add_time ASC']).page(this.get('page') || 1, 10).countSelect();
    for (var i = orderList.data.length - 1; i >= 0; i--) {
      orderList.data[i].order_status_text = await this.model('order').getOrderStatusText(orderList.data[i].order_status,false)
      const list_pic_url = await this.model("shop").where({id:orderList.data[i].shop_id}).getField('logo_url')
      orderList.data[i].list_pic_url = list_pic_url[0]
    }
    return this.success(orderList);
  }

  async detailAction() {
    const orderId = this.get('orderId');
    const orderInfo = await this.model('order').where({ id: orderId }).find();
    const voucherInfo = await this.model('voucher').where({ order_id: orderId }).select();


    if (think.isEmpty(orderInfo)) {
      return this.fail('订单不存在');
    }
    const shopInfo = await this.model('shop').where({ id: orderInfo.shop_id }).find();
    const orderPromotion = await this.model('promotion').where({ id: orderInfo.promotion_id }).find();

    // 订单状态的处理
    orderInfo.order_status_text = await this.model('order').getOrderStatusText(orderId);
    orderInfo.add_time = moment.unix(orderInfo.add_time).format('YYYY-MM-DD HH:mm:ss');

    // 订单可操作的选择,删除，支付，收货，评论，退换货
    const handleOption = await this.model('order').getOrderHandleOption(orderId);

    let result = {
      orderInfo: orderInfo,
      orderPromotion: orderPromotion,
      handleOption: handleOption,
      shopInfo: shopInfo
    }

    if (!think.isEmpty(voucherInfo)) {
      result.voucherInfo = voucherInfo
    }

    return this.success(result);
  }

  /**
   * 提交订单
   * @returns {Promise.<void>}
   */
  async submitAction() {
    let orderData = this.post()
    console.log(orderData)
    // 获取订单使用的优惠券
    //const couponId = this.post('couponId');
    const couponPrice = 0.00;
    //if (!think.isEmpty(couponId)) {

    //}

    // 订单价格计算
    //const orderTotalPrice = goodsTotalPrice + freightPrice - couponPrice; // 订单的总价
    //const actualPrice = orderTotalPrice - 0.00; // 减去其它支付的金额后，要实际支付的金额
    const currentTime = parseInt(this.getTime());
    const orderInfo = {
      order_sn: this.model('order').generateOrderNumber(),
      user_id: think.userId,

      // 收货地址和运费
      //consignee: checkedAddress.name,
      //mobile: checkedAddress.mobile,
      //province: checkedAddress.province_id,
      //city: checkedAddress.city_id,
      //district: checkedAddress.district_id,
      //address: checkedAddress.address,
      //freight_price: 0.00,

      // 留言
      //postscript: this.post('postscript'),

      // 使用的优惠券
      pay_name:orderData.promotion_name + " " + orderData.num + "份",
      coupon_id: 0,
      coupon_price: couponPrice,
      num:orderData.num,
      add_time: currentTime,
      content:JSON.stringify(orderData.content),
      promotion_id: orderData.promotion_id,
      goods_price: orderData.order_price,
      order_price: orderData.order_price,
      actual_price: orderData.order_price,
      shop_id: orderData.shop_id
    };

    // 开启事务，插入订单信息和订单商品
    const orderId = await this.model('order').add(orderInfo);
    orderInfo.id = orderId;
    if (!orderId) {
      return this.fail('订单提交失败');
    }


    return this.success({ orderInfo: orderInfo });
  }

  /**
   * 查询物流信息
   * @returns {Promise.<void>}
   */
  async payAction() {
    const point = await this.model('user').where({id:think.userId}).getField("point");
    const orderId = this.get('orderId');
    const orderInfo = await this.model("order").where({id:orderId}).find()
    if (point[0] >= orderInfo.actual_price*100) {
      let voucher = []
      for (var i = orderInfo.num - 1; i >= 0; i--) {
        voucher.push({
          order_id : orderInfo.id,
          promotion_id : orderInfo.promotion_id,
          code : this.model('order').generateVoucherCode()
        })
      }
      const result = await this.model("order").consumeTran({orderId:orderId,voucher:voucher,orderInfo:orderInfo})
      if (result == "success") {
        this.success("success")
      }else{
        this.fail("fail")
      }
    }else{
      return this.fail("余额不足")
    }
  }

  async returnAction() {
    const orderId = this.get('orderId');
    const orderInfo = await this.model("order").where({id:orderId}).find()
    const voucherInfo = await this.model("voucher").where({order_id:orderId}).select()
    let count = 0
    for (var i = voucherInfo.length - 1; i >= 0; i--) {
      if (voucherInfo[i].status == 0) {
        count = count + 1
      }
    }402
    await this.model("order").where({id:orderId}).update({order_status:402})
    await this.model("voucher").where({order_id:orderId,status:0}).update({status:2})
    let returnfee = ((orderInfo.actual_price*100)/voucherInfo.length)*count
    await this.model("user").where({id:orderInfo.user_id}).increment("point",returnfee)
    return this.success(returnfee)
    
  }
};
