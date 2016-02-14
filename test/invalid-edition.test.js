var testStore = require('./store')
var tape = require('tape')

tape('invalid edition', function(test) {
  test.plan(1)
  var level = testStore()
  level.putProject('ari', 'nda', 'nonsense', 'a'.repeat(64), function(error) {
    test.same(error.message, 'Invalid edition') }) })
