var testStore = require('./store')
var tape = require('tape')

tape('get nonexistent', function(test) {
  test.plan(2)
  var level = testStore()
  level.getProject('ari', 'nda', '1e', function(error, fetechedForm) {
    test.error(error, 'no getProject() error')
    test.same(fetechedForm, false, 'yields false') }) })
