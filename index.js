module.exports = LevelCommonFormProject

var asap = require('asap')
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
      callback(new Error('Invalid Reviewers Edition')) }) }

  if (!validPublisher(publisher)) {
    return asap(function() {
      callback(new Error('Invalid publisher name')) }) }

  if (!validProject(project)) {
    return asap(function() {
      callback(new Error('Invalid project name')) }) }

  if (!validData(data)) {
    return asap(function() {
      callback(new Error('Invalid project data')) }) }

  var key = encode([ publisher, project, edition ])
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

function validData(argument) {
  return isDigest(argument) }

function validPublisher(argument) {
  return (
    ( typeof argument === 'string' ) &&
    argument.length > 0 &&
    /^[a-z]+$/.test(argument) ) }

function validProject(argument) {
  return validPublisher(argument) }
