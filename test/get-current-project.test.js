var testStore = require('./store')
var tape = require('tape')
var series = require('async-series')

tape('get current project', function(test) {
  test.plan(5)
  var level = testStore()
  var publisher = 'ari'
  var project = 'nda'
  var previous = 'a'.repeat(64)
  var previousEdition = '1e'
  var current = 'b'.repeat(64)
  var currentEdition = '1e1u'
  series(
    [ function(done) {
        level.putProject(publisher, project, previousEdition, previous, function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject(publisher, project, currentEdition, current, function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.getCurrentEdition(publisher, project, function(error, fetchedData) {
          test.ifError(error, 'no getCurrentEdition() error')
          test.same(
            fetchedData,
            { publisher: publisher,
              project: project,
              edition: currentEdition,
              form: current },
            'getCurrentEdition() yields current edition') })
        done() } ],
    function(error) {
      test.ifError(error, 'no series error') }) })
