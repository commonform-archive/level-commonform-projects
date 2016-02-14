var testStore = require('./store')
var tape = require('tape')

tape('invalid form', function(test) {
  test.plan(1)
  var level = testStore()
  var publisher = 'avi'
  var project = 'nda'
  var edition = '1e'
  var form = 'nonsense'
  level.putProject(publisher, project, edition, form, function(error) {
    test.same(error.message, 'Invalid form') }) })
