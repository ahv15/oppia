// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview A data service that stores the exploration language code.
 */

require(
  'pages/exploration-editor-page/services/exploration-property.service.ts');
require('services/context.service');

angular.module('oppia').factory('ExplorationLanguageCodeService', [
  'ContextService', 'ExplorationPropertyService', 'SUPPORTED_CONTENT_LANGUAGES',
  'SUPPORTED_CONTENT_LANGUAGES_FOR_ANDROID',
  function(
      ContextService, ExplorationPropertyService, SUPPORTED_CONTENT_LANGUAGES,
      SUPPORTED_CONTENT_LANGUAGES_FOR_ANDROID) {
    var child = Object.create(ExplorationPropertyService);
    child.propertyName = 'language_code';
    child.getSupportedContentLanguages = function() {
      if (ContextService.isExplorationLinkedToStory()) {
        return SUPPORTED_CONTENT_LANGUAGES_FOR_ANDROID;
      }
      return SUPPORTED_CONTENT_LANGUAGES;
    };
    child.getCurrentLanguageDescription = function() {
      for (var i = 0; i < SUPPORTED_CONTENT_LANGUAGES.length; i++) {
        if (SUPPORTED_CONTENT_LANGUAGES[i].code === child.displayed) {
          return SUPPORTED_CONTENT_LANGUAGES[i].description;
        }
      }
    };
    child._isValid = function(value) {
      return SUPPORTED_CONTENT_LANGUAGES.some(function(elt) {
        return elt.code === value;
      });
    };
    return child;
  }
]);
