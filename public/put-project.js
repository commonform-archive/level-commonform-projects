/* Copyright 2016 Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var asap = require('asap')
var makeFormKey = require('../private/form-key')
var isDigest = require('is-sha-256-hex-digest')
var lock = require('level-lock')
var makeProjectKey = require('../private/project-key')
var parseEdition = require('reviewers-edition-parse')

module.exports = function putProject(publisher, project, edition, data, callback) {
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

  var projectKey = makeProjectKey(publisher, project, edition)
  var levelup = this.levelup
  var unlock = lock(levelup, projectKey, 'w')
  if (!unlock) {
    asap(function() {
      callback(new Error('Already exists')) }) }
  else {
    this._exists(projectKey, function(error, exists) {
      if (error) {
        unlock()
        callback(error) }
      else {
        if (exists) {
          unlock()
          callback(new Error('Already exists')) }
        else {
          var formKey = makeFormKey(data, publisher, project, edition)
          levelup
            .batch()
            .put(formKey, JSON.stringify(
              { publisher: publisher,
                project: project,
                edition: edition,
                form: data }))
            .put(projectKey, data)
            .write(function(error) {
              unlock()
              callback(error) }) } } }) } }

function validForm(argument) {
  return isDigest(argument) }

function validPublisher(argument) {
  return nonEmptyAlphaString(argument) }

function validProject(argument) {
  return nonEmptyAlphaString(argument) }

function nonEmptyAlphaString(argument) {
  return (
    ( typeof argument === 'string' ) &&
    ( argument.length > 0 ) &&
    /^[a-z]+$/.test(argument) ) }
