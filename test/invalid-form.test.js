var testStore = require('./store')
var tape = require('tape')

tape('invalid form', function(test) {
  test.plan(1)
  var level = testStore()
  level.putProject('ari', 'nda', '1e', 'nonsense', function(error) {
    test.same(error.message, 'Invalid form') }) })
