var testStore = require('./store')
var tape = require('tape')
var series = require('async-series')

tape('get latest edition', function(test) {
  test.plan(5)
  var level = testStore()
  series(
    [ function(done) {
        level.putProject('ari', 'nda', '1e', 'a'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject('ari', 'nda', '2e1d', 'b'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.getLatestEdition('ari', 'nda', function(error, fetchedData) {
          test.ifError(error, 'no getLatestEdition() error')
          test.same(
            fetchedData,
            { publisher: 'ari',
              project: 'nda',
              edition: '2e1d',
              form: 'b'.repeat(64) },
            'getLatestEdition() yields latest edition') })
        done() } ],
    function(error) {
      test.ifError(error, 'no series error') }) })
