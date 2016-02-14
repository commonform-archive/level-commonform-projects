var testStore = require('./store')
var tape = require('tape')

tape('put existing edition', function(test) {
  test.plan(2)
  var level = testStore()
  var publisher = 'ari'
  var project = 'nda'
  var edition = '1e'
  var form = 'a'.repeat(64)
  level.putProject(publisher, project, edition, form, function(error) {
    test.ifError(error, 'no putProject() error')
    level.putProject(publisher, project, edition, form, function(error) {
      test.same(error.message, 'Already exists') }) }) })
