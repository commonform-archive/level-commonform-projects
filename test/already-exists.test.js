var testStore = require('./store')
var tape = require('tape')

tape('put existing edition', function(test) {
  test.plan(2)
  var level = testStore()
  level.putProject('ari', 'nda', '1e', 'a'.repeat(64), function(error) {
    test.ifError(error, 'no putProject() error')
    level.putProject('ari', 'nda', '1e', 'a'.repeat(64), function(error) {
      test.same(error.message, 'Already exists') }) }) })
