import qiniu from 'qiniu';
export default class extends think.Service {
  async picListAction(prefix){
    let qconfig = this.config('qiniu');
    let mac = new qiniu.auth.digest.Mac(qconfig.access_key, qconfig.secret_key);
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    var options = {
      prefix: prefix,
    };
    const getList = think.promisify(bucketManager.listPrefix, bucketManager);

    return await getList(this.config('qiniu').option.scope, options)

  }
}