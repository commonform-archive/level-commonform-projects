module.exports = getPublisherProjects

var decodeKey = require('../private/decode-key')
var encodeKey = require('../private/encode-key')

function getPublisherProjects(publisher, callback) {
  var keys = [ ]
  this.levelup.createKeyStream(
    { gte: encodeKey([ publisher, null ]),
      lte: encodeKey([ publisher, undefined ]) })
    .on('data', function(key) {
      keys.push(decodeKey(key)) })
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
