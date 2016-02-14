var testStore = require('./store')
var tape = require('tape')

tape('race to put a project', function(test) {
  test.plan(4)
  var level = testStore()
  var publisher = 'ari'
  var project = 'nda'
  var edition = '1e'
  var data = 'a'.repeat(64)
  put(function(error) {
    test.ifError(error, 'no error on first put') })
  for (var index = 0; index < 3; index++) {
    put(function(error) {
      test.equal(
        error.message, 'Already exists',
        'later puts fail') }) }
  function put(callback) {
    level.putProject(publisher, project, edition, data, callback) } })
