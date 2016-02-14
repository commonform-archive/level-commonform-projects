var testStore = require('./store')
var tape = require('tape')

tape('invalid project', function(test) {
  test.plan(1)
  var level = testStore()
  level.putProject('ari', null, '1e', 'a'.repeat(64), function(error) {
    test.same(error.message, 'Invalid project name') }) })
