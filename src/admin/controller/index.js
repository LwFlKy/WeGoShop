const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
  	this.assign({
    	title:'thinkjs',
    	name:"lwflky"
    });
    return this.display();
  }
};
