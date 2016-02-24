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

var editionUpgrade = require('reviewers-edition-upgrade')

module.exports = function getUpgrade(publisher, project, using, callback) {
  this._getSortedEditions(publisher, project, function yieldUpgrades(error, editions) {
    if (error) {
      callback(error) }
    else {
      editions = editions.filter(function isAnUpgrade(element) {
        return editionUpgrade(using, element.edition) })
      callback(null, editions[editions.length - 1]) } }) }
