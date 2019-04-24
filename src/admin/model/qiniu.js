const qiniu = require('qiniu');
module.exports = class extends think.Model {
  async deletePic(key) {
    const qconfig = think.config('qiniu');
    const mac = new qiniu.auth.digest.Mac(qconfig.access_key, qconfig.secret_key);
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;

    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    const deleteFile = think.promisify(bucketManager.delete, bucketManager);
    return await deleteFile(think.config('qiniu').option.scope, key);
  }

  async moveFile(prefix, FileList) {
    const qconfig = think.config('qiniu');
    const mac = new qiniu.auth.digest.Mac(qconfig.access_key, qconfig.secret_key);
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    const moveFile = function(moveOperations) {
      return new Promise((resolve, reject) => {
        bucketManager.batch(moveOperations, (err, respBody, respInfo) => {
          if (err) return reject(err);
          resolve({respBody: respBody, respInfo: respInfo});
        });
      });
    };
    const moveOperations = [];
    for (let i = FileList.length - 1; i >= 0; i--) {
      const filename = FileList[i].slice(-32);
      moveOperations.push(qiniu.rs.moveOp('shangquan', FileList[i], 'shangquan', prefix + '/' + filename));
    }
    return await moveFile(moveOperations);
  }
};
