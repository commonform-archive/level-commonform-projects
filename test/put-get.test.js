var testStore = require('./store')
var tape = require('tape')

tape('put and get a project', function(test) {
  test.plan(3)
  var level = testStore()
  var publisher = 'ari'
  var project = 'nda'
  var edition = '1e'
  var form = 'a'.repeat(64)
  level.putProject(publisher, project, edition, form, function(error) {
    test.ifError(error, 'no putProject() error')
    level.getProject(publisher, project, edition, function(error, fetechedForm) {
      test.ifError(error, 'no getProject() error')
      test.same(
        fetechedForm,
        { publisher: publisher,
          project: project,
          edition: edition,
          form: form },
        'getProject() yields the project back') }) }) })
