var testStore = require('./store')
var tape = require('tape')

tape('put a project', function(test) {
  test.plan(1)
  var level = testStore()
  var publisher = 'ari'
  var project = 'nda'
  var edition = '1e'
  var data = 'a'.repeat(64)
  level.putProject(publisher, project, edition, data, function(error) {
    test.ifError(error, 'no error') }) })
