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

var testStore = require('./store')
var tape = require('tape')

tape('Race to Put a Project', function(test) {
  test.plan(4)
  var level = testStore()
  put(function(error) {
    test.ifError(error, 'no error on first put') })
  for (var index = 0; index < 3; index++) {
    put(function(error) {
      test.equal(
        error.message, 'Already exists',
        'later puts fail') }) }
  function put(callback) {
    var form = { content: [ 'A test form' ] }
    level.putProject('ari', 'nda', '1e', form, callback) } })
