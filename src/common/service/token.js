const jwt = require('jsonwebtoken');
const secret = 'aC@$Bp9vIkzMkk45QLH!L';

module.exports = class extends think.Service {
  constructor(ctx) {
    super();
    this.ctx = ctx;
  }
  /**
   * (小程序用)
   * 根据header中的X-WeGoShop-Token值获取SessionKey
   */
  async getSessionKey() {
    const token = think.token;
    if (!token) {
      return 0;
    }

    const result = await this.parse();
    if (think.isEmpty(result) || result.user_id <= 0) {
      return 0;
    }

    return result.session_key;
  }

  /**
   * 根据值获取用户id
   */
  async getUserId() {
    const token = think.token;
    if (!token) {
      return 0;
    }

    const result = await this.parse();
    if (think.isEmpty(result) || result.user_id <= 0) {
      return 0;
    }

    return result.user_id;
  }

  /**
   * 根据值获取用户信息
   */
  async getUserInfo() {
    const userId = await this.getUserId();
    if (userId <= 0) {
      return null;
    }
    console.log
   
    // 根据访问的module判断如何获取
    if(this.ctx.module == "api"){
      // ====== 用户信息 ======
      /**/ const userInfo = await this.model('user').field(['id', 'username', 'nickname', 'gender', 'avatar', 'birthday']).where({ id: userId }).find();
      /**/
      /**/ return think.isEmpty(userInfo) ? null : userInfo;
      // =====================
    }else if(this.ctx.module == "admin"){

      // ===== 管理员信息 =====
      /**/const userInfo = await this.model('admin').where({ id: userId }).find();
      /**/
      /**/if (think.isEmpty(userInfo)) {
      /**/  return null;
      /**/} else {
      /**/  // 获取权限信息并入用户数据
      /**/  const authorityData = await this.model('group', 'admin').where({ id: userInfo.admin_role_id }).find();
      /**/  authorityData.content = JSON.parse(authorityData.content);
      /**/  userInfo.authority = authorityData;
      /**/  return userInfo;
      /**/}
      // =====================
    }

  }

  /**
   * 创建token
   */
  async create(userInfo) {
    const token = jwt.sign(userInfo, secret);
    return token;
  }

  /**
   * 解析token
   */
  async parse() {
    if (think.token) {
      try {
        return jwt.verify(think.token, secret);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  /**
   * 
   */
  async verify() {
    const result = await this.parse();
    if (think.isEmpty(result)) {
      return false;
    }

    return true;
  }
};
