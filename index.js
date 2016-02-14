module.exports = LevelCommonFormProject

var asap = require('asap')
var compareEdition = require('reviewers-edition-compare')
var decode = require('bytewise/encoding/hex').decode
var encode = require('bytewise/encoding/hex').encode
var isDigest = require('is-sha-256-hex-digest')
var parseEdition = require('reviewers-edition-parse')

function LevelCommonFormProject(levelup) {
  if (!(this instanceof LevelCommonFormProject)) {
    return new LevelCommonFormProject(levelup) }
  this.levelup = levelup }

var prototype = LevelCommonFormProject.prototype

prototype.putProject = function(publisher, project, edition, data, callback) {
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
  this.exists(key, function(error, exists) {
    if (error) {
      callback(error) }
    else {
      if (exists) {
        callback(new Error('Already exists')) }
      else {
        levelup.put(key, data, callback) } } }) }

prototype.exists = function(key, callback) {
  this.levelup.get(key, function(error) {
    if (error) {
      if (error.notFound) {
        callback(null, false) }
      else {
        callback(error) } }
    else {
      callback(null, true) } }) }

function validForm(argument) {
  return isDigest(argument) }

function validPublisher(argument) {
  return (
    ( typeof argument === 'string' ) &&
    argument.length > 0 &&
    /^[a-z]+$/.test(argument) ) }

function validProject(argument) {
  return validPublisher(argument) }

prototype.getProject = function(publisher, project, edition, callback) {
  var key = projectKey(publisher, project, edition)
  this.levelup.get(key, function(error, data) {
    if (error) {
      if (error.notFound) {
        callback(null, false) }
      else {
        callback(error) } }
    else {
      var result = {
        publisher: publisher,
        project: project,
        edition: edition,
        form: data }
      callback(null, result) } }) }

prototype.getCurrentEdition = function(publisher, project, callback) {
  var editions = [ ]
  this.levelup.createReadStream({
    gte: projectKey(publisher, project, null),
    lte: projectKey(publisher, project, undefined) })
    .on('data', function(item) {
      var decodedKey = decode(item.key)
      editions.push({
        publisher: decodedKey[0],
        project: decodedKey[1],
        edition: decodedKey[2],
        form: item.value }) })
    .on('error', function(error) {
      callback(error) })
    .on('end', function() {
      editions = editions
        .sort(function(a, b) {
          return compareEdition(a.edition, b.edition) })
        .filter(function(element) {
          return !parseEdition(element.edition).hasOwnProperty('draft') })
      callback(null, editions[editions.length - 1]) }) }

prototype.getLatestEdition = function(publisher, project, callback) {
  var editions = [ ]
  this.levelup.createReadStream({
    gte: projectKey(publisher, project, null),
    lte: projectKey(publisher, project, undefined) })
    .on('data', function(item) {
      var decodedKey = decode(item.key)
      editions.push({
        publisher: decodedKey[0],
        project: decodedKey[1],
        edition: decodedKey[2],
        form: item.value }) })
    .on('error', function(error) {
      callback(error) })
    .on('end', function() {
      editions = editions
        .sort(function(a, b) {
          return compareEdition(a.edition, b.edition) })
      callback(null, editions[editions.length - 1]) }) }

function projectKey(publisher, project, edition) {
  return encode([ publisher, project, edition ]) }
