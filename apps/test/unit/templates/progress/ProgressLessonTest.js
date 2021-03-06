import { assert } from '../../../util/configuredChai';
import React from 'react';
import { shallow } from 'enzyme';
import { UnconnectedProgressLesson as ProgressLesson } from '@cdo/apps/templates/progress/ProgressLesson';
import { ViewType } from '@cdo/apps/code-studio/stageLockRedux';
import { fakeLesson, fakeLevels } from '@cdo/apps/templates/progress/progressTestHelpers';
import color from "@cdo/apps/util/color";
import { LevelStatus } from '@cdo/apps/util/sharedConstants';

describe('ProgressLesson', () => {
  const defaultProps = {
    currentStageId: 1,
    lesson: {
      ...fakeLesson('lesson1', 1),
      description_teacher: 'Teacher description here',
      description_student: 'Student description here'
    },
    levels: fakeLevels(3),
    lessonNumber: 3,
    showTeacherInfo: false,
    viewAs: ViewType.Teacher,
    hasSelectedSection: true,
    lessonIsVisible: () => true,
    lessonLockedForSection: () => false
  };

  it('renders with gray background when not hidden', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
      />
    );
    assert.equal(wrapper.props().style.background, color.lightest_gray);
  });

  it('does not render when lessonIsVisible is false', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        lessonIsVisible={() => false}
        viewAs={ViewType.Student}
      />
    );

    assert.equal(wrapper.node, null);
  });

  it('renders with white background when only visible for teachers', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        lessonIsVisible={(lesson, viewAs) => viewAs !== ViewType.Student}
      />
    );
    assert.equal(wrapper.props().style.background, color.white);
  });

  it('renders with white background when section is locked', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        lesson={fakeLesson('lesson1', 1, true)}
        lessonLockedForSection={() => true}
      />
    );
    assert.equal(wrapper.props().style.background, color.white);
  });

  it('disables bubbles when section is locked', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        viewAs={ViewType.Student}
        lesson={fakeLesson('lesson1', 1, true)}
        lessonLockedForSection={() => true}
      />
    );
    assert.equal(wrapper.find('ProgressLessonContent').props().disabled, true);
  });

  it('renders with white background locked for individual student', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        lesson={fakeLesson('lesson1', 1, true)}
        lessonLockedForSection={() => false}
        levels={defaultProps.levels.map(level => ({...level, status: LevelStatus.locked}))}
      />
    );
    assert.equal(wrapper.props().style.background, color.white);
  });

  it('renders with gray background when section is lockable but unlocked', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        lesson={fakeLesson('lesson1', 1, true)}
        lessonLockedForSection={() => false}
      />
    );
    assert.equal(wrapper.props().style.background, color.lightest_gray);
  });

  it('has an unlocked icon when section is lockable but unlocked', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        lesson={fakeLesson('lesson1', 1, true)}
        lessonLockedForSection={() => false}
      />
    );
    assert.equal(wrapper.find('FontAwesome').at(0).props().icon, 'caret-down');
    assert.equal(wrapper.find('FontAwesome').at(1).props().icon, 'unlock');
  });

  it('has a locked icon when section is lockable and locked', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        lesson={fakeLesson('lesson1', 1, true)}
        lessonLockedForSection={() => true}
      />
    );
    assert.equal(wrapper.find('FontAwesome').at(0).props().icon, 'caret-down');
    assert.equal(wrapper.find('FontAwesome').at(1).props().icon, 'lock');
  });

  it('has both a hidden and a locked icon when section is lockable and locked and hidden', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        lesson={fakeLesson('lesson1', 1, true)}
        lessonIsVisible={(lesson, viewAs) => viewAs !== ViewType.Student}
        lessonLockedForSection={() => true}
      />
    );
    assert.equal(wrapper.find('FontAwesome').at(0).props().icon, 'caret-down');
    assert.equal(wrapper.find('FontAwesome').at(1).props().icon, 'eye-slash');
    assert.equal(wrapper.find('FontAwesome').at(2).props().icon, 'lock');
  });

  it('does not have an unlocked icon if we dont have a section selected', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        hasSelectedSection={false}
        lesson={fakeLesson('lesson1', 1, true)}
      />
    );
    assert.equal(wrapper.find('FontAwesome').length, 1);
    assert.equal(wrapper.find('FontAwesome').at(0).props().icon, 'caret-down');
  });

  it('starts collapsed if it is not the current stage', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        currentStageId={2}
      />
    );
    assert.equal(wrapper.state('collapsed'), true);
  });

  it('starts uncollapsed if it is the current stage', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
      />
    );
    assert.equal(wrapper.state('collapsed'), false);
  });

  it('uncollapses itself when currentStage gets updated', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        currentStageId={null}
      />
    );
    assert.equal(wrapper.state('collapsed'), true);

    wrapper.setProps({currentStageId: 1});
    assert.equal(wrapper.state('collapsed'), false);
  });

  it('does not change collapse state when other props are updated', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        currentStageId={null}
      />
    );
    assert.equal(wrapper.state('collapsed'), true);

    wrapper.setProps({foo: 'bar'});
    assert.equal(wrapper.state('collapsed'), true);
  });

  it('shows student description when viewing as student', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        viewAs={ViewType.Student}
      />
    );
    assert.equal(wrapper.find('ProgressLessonContent').props().description, 'Student description here');
  });

  it('shows teacher description when viewing as teacher', () => {
    const wrapper = shallow(
      <ProgressLesson
        {...defaultProps}
        viewAs={ViewType.Teacher}
      />
    );
    assert.equal(wrapper.find('ProgressLessonContent').props().description, 'Teacher description here');
  });
});
