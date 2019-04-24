import Base from './base.js';
import qiniu from 'qiniu';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    let prefix = this.get('shop_id')
    let qconfig = this.config('qiniu');
    const filename = randomString(32)
    //qconfig.option.scope = qconfig.option.scope+":"+prefix+"_"+filename
    let mac = new qiniu.auth.digest.Mac(qconfig.access_key, qconfig.secret_key);
    let putPolicy = new qiniu.rs.PutPolicy( qconfig.option );
    let uploadToken=putPolicy.uploadToken(mac);
    let returnData = {
      token:uploadToken,
      filename:prefix+"/"+filename
    }
    return this.success(returnData);
  }

  uploadTokenAction(){
    let prefix = this.get('prefix')
    let qconfig = this.config('qiniu');
    const filename = randomString(32)
    //qconfig.option.scope = qconfig.option.scope+":"+prefix+"_"+filename
    let mac = new qiniu.auth.digest.Mac(qconfig.access_key, qconfig.secret_key);
    let putPolicy = new qiniu.rs.PutPolicy( qconfig.option );
    let uploadToken=putPolicy.uploadToken(mac);
    let returnData = {
      token:uploadToken,
      filename:prefix+"/"+filename
    }
    return this.success(returnData);
  }

  async picListAction(){
    let qconfig = this.config('qiniu');
    let mac = new qiniu.auth.digest.Mac(qconfig.access_key, qconfig.secret_key);
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    let prefix = this.get("prefix")
    var options = {
      prefix: prefix,
    };
    const getList = think.promisify(bucketManager.listPrefix, bucketManager);

    return this.success(await getList(this.config('qiniu').option.scope, options))

  }

  async deleteAction(){
    let qconfig = this.config('qiniu');
    let mac = new qiniu.auth.digest.Mac(qconfig.access_key, qconfig.secret_key);
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;

    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    let key = this.get("key")
    const deleteFile = think.promisify(bucketManager.delete, bucketManager);
    return this.success(await deleteFile(this.config('qiniu').option.scope, key))
  }

  async moveFileAction(){
    let qconfig = this.config('qiniu');
    let mac = new qiniu.auth.digest.Mac(qconfig.access_key, qconfig.secret_key);
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    const moveFile = function (moveOperations) {
      return new Promise((resolve, reject) => {
      bucketManager.batch(moveOperations, (err, respBody, respInfo) => {
          if(err) return reject(err);
          resolve({respBody:respBody,respInfo:respInfo});
        })
      })
    }

    let tmpFileList = this.post("tmpFileList")
    let prefix = this.post("prefix")
    let moveOperations = []
    for (let i = tmpFileList.length - 1; i >= 0; i--) {
      if (tmpFileList[i].hasOwnProperty('response')) {
        let filename = tmpFileList[i].response.key.slice(-32)
        moveOperations.push(qiniu.rs.moveOp("shangquan",tmpFileList[i].response.key,"shangquan",prefix+"/"+filename))
      }
    }
    return this.success(await moveFile(moveOperations))
  }
}