var testStore = require('./store')
var tape = require('tape')

tape('invalid publisher', function(test) {
  test.plan(1)
  var level = testStore()
  level.putProject(null, 'nda', '1e', 'a'.repeat(64), function(error) {
    test.same(error.message, 'Invalid publisher name') }) })
