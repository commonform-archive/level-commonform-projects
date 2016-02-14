var testStore = require('./store')
var tape = require('tape')
var series = require('async-series')

tape('put and get a project', function(test) {
  test.plan(2)
  var level = testStore()
  var publisher = 'ari'
  var project = 'nda'
  var edition = '1e'
  var data = 'a'.repeat(64)
  series(
    [ function(done) {
        level.putProject(publisher, project, edition, data, done) },
      function(done) {
        level.getProject(publisher, project, edition, function(error, fetechedData) {
          if (error) {
            test.ifError(error)
            done(error) }
          else {
            test.equal(fetechedData, data)
            done() } }) } ],
    function(error) {
      test.ifError(error) }) })
