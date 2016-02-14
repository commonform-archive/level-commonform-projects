var testStore = require('./store')
var tape = require('tape')

tape('invalid edition', function(test) {
  test.plan(1)
  var level = testStore()
  var publisher = 'avi'
  var project = 'nda'
  var edition = 'nonsense'
  var form = 'a'.repeat(64)
  level.putProject(publisher, project, edition, form, function(error) {
    test.same(error.message, 'Invalid edition') }) })
