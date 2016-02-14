var testStore = require('./store')
var tape = require('tape')

tape('put a project', function(test) {
  test.plan(1)
  var level = testStore()
  level.putProject('ari', 'nda', '1e', 'a'.repeat(64), function(error) {
    test.ifError(error, 'no error') }) })
