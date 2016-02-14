module.exports = putProject

var asap = require('asap')
var isDigest = require('is-sha-256-hex-digest')
var lock = require('level-lock')
var projectKey = require('../private/project-key')
var parseEdition = require('reviewers-edition-parse')

function putProject(publisher, project, edition, data, callback) {
  var parsedEdition = parseEdition(edition)
  if (parsedEdition === false) {
    return asap(function() {
      callback(new Error('Invalid edition')) }) }

  if (!validPublisher(publisher)) {
    return asap(function() {
      callback(new Error('Invalid publisher name')) }) }

  if (!validProject(project)) {
    return asap(function() {
      callback(new Error('Invalid project name')) }) }

  if (!validForm(data)) {
    return asap(function() {
      callback(new Error('Invalid form')) }) }

  var key = projectKey(publisher, project, edition)
  var levelup = this.levelup
  var unlock = lock(levelup, key, 'w')
  if (!unlock) {
    callback(new Error('Already exists')) }
  else {
    this._exists(key, function(error, exists) {
      if (error) {
        unlock()
        callback(error) }
      else {
        if (exists) {
          unlock()
          callback(new Error('Already exists')) }
        else {
          levelup.put(key, data, function(error) {
            unlock()
            callback(error) }) } } }) } }

function validForm(argument) {
  return isDigest(argument) }

function validPublisher(argument) {
  return (
    ( typeof argument === 'string' ) &&
    argument.length > 0 &&
    /^[a-z]+$/.test(argument) ) }

function validProject(argument) {
  return validPublisher(argument) }
