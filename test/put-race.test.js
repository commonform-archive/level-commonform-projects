var testStore = require('./store')
var tape = require('tape')

tape('race to put a project', function(test) {
  test.plan(4)
  var level = testStore()
  put(function(error) {
    test.ifError(error, 'no error on first put') })
  for (var index = 0; index < 3; index++) {
    put(function(error) {
      test.equal(
        error.message, 'Already exists',
        'later puts fail') }) }
  function put(callback) {
    level.putProject('ari', 'nda', '1e', 'a'.repeat(64), callback) } })
