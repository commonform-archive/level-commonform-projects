var testStore = require('./store')
var tape = require('tape')

tape('invalid publisher', function(test) {
  test.plan(1)
  var level = testStore()
  var publisher = null
  var project = 'nda'
  var edition = '1e'
  var form = 'a'.repeat(64)
  level.putProject(publisher, project, edition, form, function(error) {
    test.same(error.message, 'Invalid publisher name') }) })
