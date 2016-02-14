module.exports = getCurrentEdition

var parseEdition = require('reviewers-edition-parse')

function getCurrentEdition(publisher, project, callback) {
  this._getSortedEditions(publisher, project, function(error, editions) {
    if (error) {
      callback(error) }
    else {
      editions = editions.filter(function(element) {
        return !parseEdition(element.edition).hasOwnProperty('draft') })
      callback(null, editions[editions.length - 1]) } }) }
