// 微信公众号service
const crypto = require('crypto');
const md5 = require('md5');
const xml2js = require('xml2js');

module.exports = class extends think.Service {  
  /** 
   * 构建函数
   * @param postData 收到的数据集
   * @param openid 目标用户OpenID
   * @param mpid 公众号ID
   * @param unionid 开放平台ID
   * 
   */ 
  constructor(postData,openid = "",mpid = "",unionid = "") {
    super();
    this.postData = postData
    this.openid = openid;
    this.unionid = unionid;
    this.mpid = mpid;
    this.timestamp = Date.parse(new Date())/1000;
    this.builder = new xml2js.Builder({cdata:true});
    this.method = {
      // 设置不同事件的响应
      text:async (callback = undefined) => {if(callback !== undefined){callback()}else{
        return ""
      }},
      image:async (callback = undefined) => {if(callback !== undefined){callback()}else{
        return ""
      }},
      voice:async (callback = undefined) => {if(callback !== undefined){callback()}else{
        return ""
      }},
      shortvideo:async (callback = undefined) => {if(callback !== undefined){callback()}else{
        return ""
      }},
      location:async (callback = undefined) => {if(callback !== undefined){callback()}else{
        return ""
      }},
      link:async (callback = undefined) => {if(callback !== undefined){callback()}else{
        return ""
      }},
      event:{
        TEMPLATESENDJOBFINISH:async (callback = undefined) => {if(callback !== undefined){callback()}else{
          return ""
        }},
        subscribe:{
          qrscene_binding:async (callback = undefined) => {if(callback !== undefined){callback()}else{
            this.model("user").where({union_id:this.unionid}).update({weixin_openid:this.unionid})
            const id = await this.model("user").where({union_id:this.unionid}).getField('id')
            const shop_info = await this.model("shop").where({owner_id:id}).find()
            this.model("admin").where({shop_id:shop_info.id,admin_role_id:3}).update({is_binding:1,weixin_openid:this.openid})
            const admin_id = await this.model("admin").where({shop_id:shop_info.id,admin_role_id:3}).getField("id")
            return await this.createTextMessage([
              "您的门店\""+shop_info.name+"\"已完成绑定",
              "------------",
              "请登录https://admin.shop.funnything.net/",
              "填写相关资料完成初始化",
              "审核通过后即可上线门店",
              "------------",
              "账号："+admin_id+"",
              "初始密码:admin",
              "------------",
              "商户相关通知将会通过该公众号发送"
            ])
          }},
        },
        unsubscribe:async (callback = undefined) => {if(callback !== undefined){callback()}else{
          return ""
        }},
        SCAN:{
          binding:async (callback = undefined) => {if(callback !== undefined){callback()}else{
            this.model("user").where({union_id:this.unionid}).update({weixin_openid:this.unionid})
            const id = await this.model("user").where({union_id:this.unionid}).getField('id')
            const shop_info = await this.model("shop").where({owner_id:id}).find()
            this.model("admin").where({shop_id:shop_info.id,admin_role_id:3}).update({is_binding:1,weixin_openid:this.openid})
            const admin_id = await this.model("admin").where({shop_id:shop_info.id,admin_role_id:3}).getField("id")
            return await this.createTextMessage([
              "您的门店\""+shop_info.name+"\"已完成绑定",
              "------------",
              "请登录https://admin.shop.funnything.net/",
              "填写相关资料完成初始化",
              "审核通过后即可上线门店",
              "------------",
              "账号："+admin_id+"",
              "初始密码:admin",
              "------------",
              "商户相关通知将会通过该公众号发送"
            ])
          }}
        },
        // 扫码事件触发
        scancode_waitmsg: {
          /** 
           * 场景值：VOUCHER
           * 扫码核销
           */
          VOUCHER:async (callback = undefined) => {if(callback !== undefined){callback()}else{
            const voucher_code = this.postData.ScanCodeInfo[0].ScanResult[0]

            const voucherModel = this.model("voucher").where({code:voucher_code})
            const voucherInfo = await voucherModel.find()

            const orderModel = this.model("order").where({id:voucherInfo.order_id})
            const orderInfo = await orderModel.find()

            const promotionInfo = this.model("promotion").where({id:voucherInfo.promotion_id}).find()

            const adminInfo = await this.model("admin").where({weixin_openid:this.openid}).find()

            let ReplyContent = []
            let letGo = true
            console.log(adminInfo.shop_id,orderInfo.shop_id)
            if (adminInfo.shop_id !== orderInfo.shop_id) {
              letGo = false
              return await this.createTextMessage("非本店核销券")
            }
            if (voucherInfo.status !== 0) {
              letGo = false
              return await this.createTextMessage("该券已使用")
            }

            if (orderInfo.order_status !== 201) {
              letGo = false
              return await this.createTextMessage("该订单已使用或已退款")
            }
            orderInfo.content = JSON.parse(orderInfo.content)
            if (letGo) {
              ReplyContent.push(
                "订单编号：",
                orderInfo.order_sn,
                "",
                "订单总价：",
                "￥"+orderInfo.order_price,
                "",
                "订单内容："
              )
              for (var i = 0; i <= orderInfo.content.length -1; i++) {
                ReplyContent.push(orderInfo.content[i].name+" "+orderInfo.content[i].sum+orderInfo.content[i].unit)
              }
              const time = new Date(orderInfo.add_time*1000)
              ReplyContent.push(
                "",
                "实付价格：",
                "￥"+orderInfo.actual_price,
                "",
                "购买时间：",
                time.toLocaleString(),
                "<a href='https://open.weixin.qq.com/connect/oauth2/authorize?appid="+think.config('mp').AppID+"&redirect_uri=https%3A%2F%2Fshop.funnything.net%2Fapi%2Fvoucher&response_type=code&scope=snsapi_base&state="+voucher_code+"#wechat_redirect\"'>点此核销</a>"
              )
            }
            return await this.createTextMessage(ReplyContent.reverse())
          }}
        },
        LOCATION:async (callback = undefined) => {if(callback !== undefined){callback()}else{
          return ""
        }},
        CLICK:async (callback = undefined) => {if(callback !== undefined){callback()}else{
          return ""
        }},
        LOCATION:async (callback = undefined) => {if(callback !== undefined){callback()}else{
          return ""
        }},
        VIEW:async (callback = undefined) => {if(callback !== undefined){callback()}else{
          return ""
        }},
      }
    }
  }

  /**
   * 创建文字信息
   */  
  async createTextMessage(content){
    let msg = ""
    if (think.isArray(content)) {
      for (var i = content.length - 1; i >= 0; i--) {
        if (i == content.length - 1) {
          msg = content[i]
        }else{
          msg = msg + "\n" + content[i]
        }
      }
    }else{
      msg = content
    }
    let xml = {
      xml:{
        ToUserName:""+this.openid+"",
        FromUserName:""+this.mpid+"",
        CreateTime:this.timestamp,
        MsgType:"text",
        Content:msg,
      }
    }
    xml = this.builder.buildObject(xml);
    return xml
  }

  /**
   * 创建空信息
   */ 
  emptyMsg(){
    let xml = {
      xml:{
        ToUserName:""+this.openid+"",
        FromUserName:""+this.mpid+"",
        CreateTime:this.timestamp,
        MsgType:"text",
        Content:""+content+"",
      }
    }
    xml = this.builder.buildObject(xml);
    return xml
  }
};
