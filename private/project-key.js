module.exports = projectKey

var encodeKey = require('./encode-key')

function projectKey(publisher, project, edition) {
  return encodeKey([ publisher, project, edition ]) }
