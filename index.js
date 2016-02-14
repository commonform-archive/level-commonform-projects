module.exports = LevelCommonFormProjects

function LevelCommonFormProjects(levelup) {
  if (!(this instanceof LevelCommonFormProjects)) {
    return new LevelCommonFormProjects(levelup) }
  this.levelup = levelup }

var prototype = LevelCommonFormProjects.prototype

// Private
prototype._exists = require('./private/exists')
prototype._getSortedEditions = require('./private/get-sorted-editions')

// Public
prototype.getCurrentEdition = require('./public/get-current-edition')
prototype.getLatestEdition = require('./public/get-latest-edition')
prototype.getProject = require('./public/get-project')
prototype.getPublisherProjects = require('./public/get-publisher-projects')
prototype.getUpgrade = require('./public/get-upgrade')
prototype.putProject = require('./public/put-project')
