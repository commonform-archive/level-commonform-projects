/* Copyright 2016 Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var decodeKey = require('bytewise/encoding/hex').decode
var makeProjectKey = require('../private/project-key')

module.exports = function getPublishers(callback) {
  var publishers = [ ]
  this.levelup.createReadStream(
    { // In bytewise's ordering, null is the lowest-ranked value.
      gt: makeProjectKey(null, null, null),
      // In bytewise's ordering, undefined is the highest-ranked value.
      lt: makeProjectKey(undefined, undefined, undefined),
      values: false })
    .on('data', function(key) {
      var decodedKey = decodeKey(key)
      var publisher = decodedKey[1]
      if (publishers.indexOf(publisher) < 0) {
        publishers.push(publisher) } })
    .on('error', function(error) {
      callback(error) })
    .on('end', function() {
      callback(null, publishers.sort()) }) }
