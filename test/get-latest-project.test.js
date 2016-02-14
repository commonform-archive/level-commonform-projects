var testStore = require('./store')
var tape = require('tape')
var series = require('async-series')

tape('get latest edition', function(test) {
  test.plan(5)
  var level = testStore()
  var publisher = 'ari'
  var project = 'nda'
  var previous = 'a'.repeat(64)
  var previousEdition = '1e'
  var latest = 'b'.repeat(64)
  var latestEdition = '2e1d'
  series(
    [ function(done) {
        level.putProject(publisher, project, previousEdition, previous, function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject(publisher, project, latestEdition, latest, function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.getLatestEdition(publisher, project, function(error, fetchedData) {
          test.ifError(error, 'no getLatestEdition() error')
          test.same(
            fetchedData,
            { publisher: publisher,
              project: project,
              edition: latestEdition,
              form: latest },
            'getLatestEdition() yields latest edition') })
        done() } ],
    function(error) {
      test.ifError(error, 'no series error') }) })
