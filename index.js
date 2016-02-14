// Copyright 2016 Kyle E. Mitchell
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

module.exports = function LevelCommonFormProjects(levelup) {
  if (!(this instanceof LevelCommonFormProjects)) {
    return new LevelCommonFormProjects(levelup) }
  this.levelup = levelup }

var prototype = module.exports.prototype

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
