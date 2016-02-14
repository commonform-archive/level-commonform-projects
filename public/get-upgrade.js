module.exports = getUpgrade

var editionUpgrade = require('reviewers-edition-upgrade')

function getUpgrade(publisher, project, using, callback) {
  this._getSortedEditions(publisher, project, function(error, editions) {
    if (error) {
      callback(error) }
    else {
      editions = editions.filter(function(element) {
        return editionUpgrade(using, element.edition) })
      callback(null, editions[editions.length - 1]) } }) }
