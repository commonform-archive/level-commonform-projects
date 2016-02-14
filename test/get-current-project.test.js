var testStore = require('./store')
var tape = require('tape')
var series = require('async-series')

tape('get current project', function(test) {
  test.plan(5)
  var level = testStore()
  series(
    [ function(done) {
        level.putProject('ari', 'nda', '1e', 'a'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject('ari', 'nda', '1e1u', 'b'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.getCurrentEdition('ari', 'nda', function(error, fetchedData) {
          test.ifError(error, 'no getCurrentEdition() error')
          test.same(
            fetchedData,
            { publisher: 'ari',
              project: 'nda',
              edition: '1e1u',
              form: 'b'.repeat(64) },
            'getCurrentEdition() yields current edition') })
        done() } ],
    function(error) {
      test.ifError(error, 'no series error') }) })
