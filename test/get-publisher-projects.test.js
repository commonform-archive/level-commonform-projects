var testStore = require('./store')
var tape = require('tape')
var series = require('async-series')

tape('get publisher projects', function(test) {
  test.plan(5)
  var level = testStore()
  series(
    [ function(done) {
        level.putProject('ari', 'b', '1e', 'a'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject('ari', 'a', '1e', 'a'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.getPublisherProjects('ari', function(error, projects) {
          test.ifError(error, 'no getPublisherProjects() error')
          test.same(
            projects, [ 'a', 'b' ],
            'getPublisherProjects() yields sorted project names') })
        done() } ],
    function(error) {
      test.ifError(error, 'no series error') }) })
