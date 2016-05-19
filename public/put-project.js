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
var validForm = require('commonform-validate').form
var lock = require('level-lock')
var makeProjectKey = require('../private/project-key')
var normalize = require('commonform-normalize')
var parseEdition = require('reviewers-edition-parse')

module.exports = function putProject(publisher, project, edition, form, callback) {
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

  if (!validForm(form)) {
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
          var normalized = normalize(form)
          var root = normalized.root
          var digests = Object.keys(normalized)
            .filter(function(key) { return ( key !== 'root' ) })
          var batch = levelup.batch()
          batch.put(projectKey, root)
          digests.forEach(function(digest) {
            var isRoot = ( digest === root )
            var formKey = makeFormKey(digest, publisher, project, edition, isRoot)
            batch.put(formKey,
              { publisher: publisher,
                project: project,
                edition: edition,
                root: ( digest === root ),
                digest: digest }) })
          batch.write(function(error) {
            unlock()
            callback(error) }) } } }) } }

function validPublisher(argument) {
  return (
    ( typeof argument === 'string' ) &&
    /^[a-z0-9]+$/.test(argument) ) }

function validProject(argument) {
  return (
    ( typeof argument === 'string' ) &&
    /^[a-z0-9-]+$/.test(argument) ) }
