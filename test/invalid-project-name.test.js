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

tape('Invalid Project', function(test) {
  test.plan(1)
  var level = testStore()
  var form = { content: [ 'A test form' ] }
  level.putProject('ari', null, '1e', form, function(error) {
    test.same(
      error.message, 'Invalid project name',
      'calls back with an error') }) })

tape('Project name with dashes', function(test) {
  test.plan(1)
  var level = testStore()
  var form = { content: [ 'A test form' ] }
  level.putProject('ari', 'ugly-nda', '1e', form, function(error) {
    test.ifError(error) }) })

tape('Project name with digits', function(test) {
  test.plan(1)
  var level = testStore()
  var form = { content: [ 'A test form' ] }
  level.putProject('ari', '101-nda', '1e', form, function(error) {
    test.ifError(error) }) })

tape('Zero-length project name', function(test) {
  test.plan(1)
  var level = testStore()
  var form = { content: [ 'A test form' ] }
  level.putProject('ari', '', '1e', form, function(error) {
    test.same(
      error.message, 'Invalid project name',
      'calls back with an error') }) })
