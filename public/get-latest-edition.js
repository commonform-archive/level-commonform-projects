module.exports = getLatestEdition

function getLatestEdition(publisher, project, callback) {
  this._getSortedEditions(publisher, project, function(error, editions) {
    callback(null, editions[editions.length - 1]) }) }
