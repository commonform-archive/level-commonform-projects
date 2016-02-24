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
var series = require('async-series')

tape('Get Projects for Form', function(test) {
  test.plan(5)
  var level = testStore()
  series(
    [ function(done) {
        level.putProject('ari', 'nda', '1e', 'a'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject('ben', 'nda', '2e', 'a'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.getProjects('a'.repeat(64), function(error, fetchedData) {
          test.ifError(error, 'no getProjects() error')
          test.same(
            fetchedData,
            [ { publisher: 'ari',
                project: 'nda',
                edition: '1e',
                form: 'a'.repeat(64) },
              { publisher: 'ben',
                project: 'nda',
                edition: '2e',
                form: 'a'.repeat(64) } ],
            'getProjects() lists matching project') })
        done() } ],
    function(error) {
      test.ifError(error, 'no series error') }) })
