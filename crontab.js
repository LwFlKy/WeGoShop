module.exports = [{
  interval: '30m',
  immediate: true,
  handle: 'mp/getAccessToken',
}, {
  cron: '0 */1 * * *',
  type: 'all'
}]