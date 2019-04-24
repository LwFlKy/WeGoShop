const model = require('think-model');
const cache = require('think-cache');
const view = require('think-view');
const mongo = require('think-mongo');
const session = require('think-session');

module.exports = [
  model(think.app),
  mongo(think.app),
  cache,
  session,
  view
];
