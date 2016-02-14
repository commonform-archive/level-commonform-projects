module.exports = getProject

var projectKey = require('../private/project-key')

function getProject(publisher, project, edition, callback) {
  var key = projectKey(publisher, project, edition)
  this.levelup.get(key, function(error, data) {
    if (error) {
      if (error.notFound) {
        callback(null, false) }
      else {
        callback(error) } }
    else {
      var result = {
        publisher: publisher,
        project: project,
        edition: edition,
        form: data }
      callback(null, result) } }) }
