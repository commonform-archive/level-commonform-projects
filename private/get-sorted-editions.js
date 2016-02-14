module.exports = getSortedEditions

var compareEdition = require('reviewers-edition-compare')
var decode = require('bytewise/encoding/hex').decode
var projectKey = require('./project-key')

function getSortedEditions(publisher, project, callback) {
  var editions = [ ]
  this.levelup.createReadStream({
    gte: projectKey(publisher, project, null),
    lte: projectKey(publisher, project, undefined) })
    .on('data', function(item) {
      var decodedKey = decode(item.key)
      editions.push({
        publisher: decodedKey[0],
        project: decodedKey[1],
        edition: decodedKey[2],
        form: item.value }) })
    .on('error', function(error) {
      callback(error) })
    .on('end', function() {
      editions.sort(function(a, b) {
        return compareEdition(a.edition, b.edition) })
      callback(null, editions) }) }
