module.exports = getPublisherProjects

var decode = require('bytewise/encoding/hex').decode
var encode = require('bytewise/encoding/hex').encode

function getPublisherProjects(publisher, callback) {
  var keys = [ ]
  this.levelup.createKeyStream(
    { gte: encode([ publisher, null ]),
      lte: encode([ publisher, undefined ]) })
    .on('data', function(key) {
      keys.push(decode(key)) })
    .on('error', function(error) {
      callback(error) })
    .on('end', function() {
      var projectNames = keys
        .reduce(
            function(projectNames, key) {
              var projectName = key[1]
              return (
                ( projectNames.indexOf(projectName) < 0 ) ?
                  projectNames.concat(projectName) :
                  projectNames ) },
            [ ])
        .sort()
      callback(null, projectNames) }) }
