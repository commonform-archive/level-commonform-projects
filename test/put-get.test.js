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

var testStore = require('./store')
var tape = require('tape')

tape('put and get a project', function(test) {
  test.plan(3)
  var level = testStore()
  level.putProject('ari', 'nda', '1e', 'a'.repeat(64), function(error) {
    test.ifError(error, 'no putProject() error')
    level.getProject('ari', 'nda', '1e', function(error, fetechedForm) {
      test.ifError(error, 'no getProject() error')
      test.same(
        fetechedForm,
        { publisher: 'ari',
          project: 'nda',
          edition: '1e',
          form: 'a'.repeat(64) },
        'getProject() yields the project back') }) }) })
