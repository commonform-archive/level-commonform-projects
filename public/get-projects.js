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

var compareEdition = require('reviewers-edition-compare')
var decodeKey = require('bytewise/encoding/hex').decode
var makeFormKey = require('../private/form-key')

module.exports = function getProjects(digest, callback) {
  var projects = [ ]
  this.levelup.createReadStream(
    { // In bytewise's ordering, null is the lowest-ranked value.
      gt: makeFormKey(digest, null),
      // In bytewise's ordering, undefined is the highest-ranked value.
      lt: makeFormKey(digest, undefined) })
    .on('data', function pushToProjects(item) {
      var decodedKey = decodeKey(item.key)
      projects.push(
        { digest: decodedKey[1],
          publisher: decodedKey[2],
          project: decodedKey[3],
          edition: decodedKey[4],
          root: decodedKey[5] }) })
    .on('error', function yieldError(error) {
      callback(error) })
    .on('end', function yieldProjects() {
      projects.sort(compareProjects)
      callback(null, projects) }) }

function compareProjects(a, b) {
  if (a.publisher < b.publisher) {
    return -1 }
  else if (a.publisher > b.publisher) {
    return 1 }
  else {
    if (a.project < b.project) {
      return -1 }
    else if (a.project > b.project) {
      return 1 }
    else {
      return compareEdition(a.edition, b.edition) } } }
