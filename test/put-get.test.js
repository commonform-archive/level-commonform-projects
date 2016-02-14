var testStore = require('./store')
var tape = require('tape')

tape('put and get a project', function(test) {
  test.plan(3)
  var level = testStore()
  level.putProject('ari', 'nda', '1e', 'a'.repeat(64), function(error) {
    test.ifError(error, 'no putProject() error')
    level.getProject('ari', 'nda', '1e', function(error, fetechedForm) {
      test.ifError(error, 'no getProject() error')
      test.same(
        fetechedForm,
        { publisher: 'ari',
          project: 'nda',
          edition: '1e',
          form: 'a'.repeat(64) },
        'getProject() yields the project back') }) }) })
