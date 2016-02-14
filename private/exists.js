module.exports = exists

function exists(key, callback) {
  this.levelup.get(key, function(error) {
    if (error) {
      if (error.notFound) {
        callback(null, false) }
      else {
        callback(error) } }
    else {
      callback(null, true) } }) }
