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

var decodeKey = require('../private/decode-key')
var encodeKey = require('../private/encode-key')

module.exports = function getPublisherProjects(publisher, callback) {
  var keys = [ ]
  this.levelup.createKeyStream(
    { gte: encodeKey([ publisher, null ]),
      lte: encodeKey([ publisher, undefined ]) })
    .on('data', function pushDecodedKey(key) {
      keys.push(decodeKey(key)) })
    .on('error', function yieldError(error) {
      callback(error) })
    .on('end', function yieldListOfProjects() {
      var projectNames = keys
        .reduce(
            function makeListOfProjects(projectNames, key) {
              var projectName = key[1]
              return (
                ( projectNames.indexOf(projectName) < 0 ) ?
                  projectNames.concat(projectName) :
                  projectNames ) },
            [ ])
        .sort()
      callback(null, projectNames) }) }
