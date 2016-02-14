var testStore = require('./store')
var tape = require('tape')
var series = require('async-series')

tape('get upgrade of project', function(test) {
  test.plan(6)
  var level = testStore()
  series(
    [ function(done) {
        level.putProject('ari', 'nda', '1e7c', 'a'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject('ari', 'nda', '2e', 'b'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject('ari', 'nda', '1e3u', 'c'.repeat(64), function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.getUpgrade('ari', 'nda', '1e', function(error, fetchedData) {
          test.ifError(error, 'no getUpgrade() error')
          test.same(
            fetchedData,
            { publisher: 'ari',
              project: 'nda',
              edition: '1e7c',
              form: 'a'.repeat(64) },
            'getUpgrade() yields expected edition') })
        done() } ],
    function(error) {
      test.ifError(error, 'no series error') }) })
