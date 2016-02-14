var testStore = require('./store')
var tape = require('tape')

tape('put and get a project', function(test) {
  test.plan(3)
  var level = testStore()
  var publisher = 'ari'
  var project = 'nda'
  var edition = '1e'
  var data = 'a'.repeat(64)
  level.putProject(publisher, project, edition, data, function(error) {
    test.ifError(error, 'no putProject() error')
    level.getProject(publisher, project, edition, function(error, fetechedData) {
      test.ifError(error, 'no getProject() error')
      test.equal(
        fetechedData, data,
        'getProject() yields same data') }) }) })
