var testStore = require('./store')
var tape = require('tape')
var series = require('async-series')

tape('get publisher projects', function(test) {
  test.plan(5)
  var level = testStore()
  var publisher = 'ari'
  series(
    [ function(done) {
        level.putProject(publisher, 'b', '1e', 'a'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject(publisher, 'a', '1e', 'a'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.getPublisherProjects(publisher, function(error, projects) {
          test.ifError(error, 'no getPublisherProjects() error')
          test.same(
            projects, [ 'a', 'b' ],
            'getPublisherProjects() yields sorted project names') })
        done() } ],
    function(error) {
      test.ifError(error, 'no series error') }) })
