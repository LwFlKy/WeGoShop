# WeGoShop
+ 开源团购商城服务端（Node.js + ThinkJS）(Alpha)
+ 该项目由 [nideshop](https://www.nideshop.com)[[github](https://github.com/tumobi/nideshop)] 移植修改而来，使用方法也与该项目差不多，请参照该项目运行。
+ 管理平台端 [WeGoShop-admin_panel](https://github.com/LwFlKy/WeGoShop-admin_panel)
+ 微信小程序端 [WeGoShop-mini_program](https://github.com/LwFlKy/WeGoShop-mini_program)
+ 该项目为个人业余开发项目，许多地方的代码不规范，很多Bug，仅供参考，请勿投入生产环境！

## Usage

clone it.

```
npm install
```

导入/database中有mongodb与mysql的初始结构

### 修改下列文件
```
//密码密匙已重置，请更新配置

/src/common/config.js
填入相应微信支付、七牛云、微信公众号、小程序的ID与Key


/src/common/adapter.js
  mysql: { // mysql数据库配置
    handle: mysql,
    database: 'WeGoShop',
    prefix: 'WeGoShop_',
    encoding: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    user: 'WeGoShop',
    password: 'RNzPptSDdWOU3WRj',
    charset: 'utf8mb4',
    dateStrings: true
  },
  admin: { // 同上，更改数据库名
    handle: mysql,
    database: 'WeGoShop_admin',
    prefix: 'WeGoShop_admin_',
    encoding: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    user: 'WeGoShop',
    password: 'RNzPptSDdWOU3WRj',
    charset: 'utf8mb4',
    dateStrings: true
  },
  mongo: { // mongo数据库配置
    host: '127.0.0.1',
    port: 27017,
    user: 'wgsSerConn',
    password: '&PFPhr1!kWkypqiC',
    database: 'WeGoShop'
  }
```

### 开始运行
```
npm run start
```

### 备注
有任何问题与bug请提交issue
