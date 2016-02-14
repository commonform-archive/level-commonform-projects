var testStore = require('./store')
var tape = require('tape')

tape('get nonexistent', function(test) {
  test.plan(2)
  var level = testStore()
  var publisher = 'ari'
  var project = 'nda'
  var edition = '1e'
  level.getProject(publisher, project, edition, function(error, fetechedForm) {
    test.error(error, 'no getProject() error')
    test.same(fetechedForm, false, 'yields false') }) })
