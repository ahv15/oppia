// Copyright 2017 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview unit tests for outcome object factory.
 */

import { TestBed } from '@angular/core/testing';

import { AnswerGroupObjectFactory } from
  'domain/exploration/AnswerGroupObjectFactory';
import { OutcomeObjectFactory } from 'domain/exploration/OutcomeObjectFactory';

describe('Answer Group Object Factory', () => {
  let agof: AnswerGroupObjectFactory;
  let oof: OutcomeObjectFactory;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerGroupObjectFactory]
}); 
    agof = TestBed.get(AnswerGroupObjectFactory);
    oof = TestBed.get(OutcomeObjectFactory);
  });
  it('should create a answer group from dict and convert a answer' +
  'group object to backend dict correctly', inject(() => {
    var testAnswerGroup = agof.createNew([], oof.createNew('dest_1',
      'outcome_1', '', []), ['training_data'], 'skill_id-1');
    expect(testAnswerGroup.toBackendDict()).toEqual({
      rule_specs: [],
      outcome: {
        dest: 'dest_1',
        feedback: {
          content_id: 'outcome_1',
          html: ''
        },
        labelled_as_correct: false,
        param_changes: [],
        refresher_exploration_id: null,
        missing_prerequisite_skill_id: null
      },
      training_data: ['training_data'],
      tagged_skill_misconception_id: 'skill_id-1'
    });
    expect(agof.createFromBackendDict({
      rule_specs: [],
      outcome: {
        dest: 'dest_1',
        feedback: {
          content_id: 'outcome_1',
          html: ''
        },
        labelled_as_correct: false,
        param_changes: [],
        refresher_exploration_id: null,
        missing_prerequisite_skill_id: null
      },
      training_data: ['training_data'],
      tagged_skill_misconception_id: 'skill_id-1'
    })).toEqual(agof.createNew([], oof.createNew('dest_1', 'outcome_1', '', []),
      ['training_data'], 'skill_id-1'));
  }));
  it('should be able to create a new answer group object from the dict',
    inject(()=>{ expect(agof.createNew([], oof.createNew('dest_1',
      'outcome_1', '', []), ['training_data'], 'skill_id-1')).toEqual(
      agof.createFromBackendDict({
        rule_specs: [
        outcome: {
          dest: 'dest_1',
          feedback: {
            content_id: 'outcome_1',
            html: ''
          },
          labelled_as_correct: false,
          param_changes: [],
          refresher_exploration_id: null,
          missing_prerequisite_skill_id: null
        },
        training_data: ['training_data'],
        tagged_skill_misconception_id: 'skill_id-1'
      })
    );
  }));
});
