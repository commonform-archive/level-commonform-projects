module.exports = projectKey

var encode = require('bytewise/encoding/hex').encode

function projectKey(publisher, project, edition) {
  return encode([ publisher, project, edition ]) }
