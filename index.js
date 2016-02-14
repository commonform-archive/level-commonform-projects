module.exports = LevelCommonFormProject

function LevelCommonFormProject(levelup) {
  if (!(this instanceof LevelCommonFormProject)) {
    return new LevelCommonFormProject(levelup) }
  this.levelup = levelup }

var prototype = LevelCommonFormProject.prototype

// Private
prototype._exists = require('./private/exists')
prototype._getSortedEditions = require('./private/get-sorted-editions')

// Public
prototype.getCurrentEdition = require('./public/get-current-edition')
prototype.getLatestEdition = require('./public/get-latest-edition')
prototype.getProject = require('./public/get-project')
prototype.putProject = require('./public/put-project')
