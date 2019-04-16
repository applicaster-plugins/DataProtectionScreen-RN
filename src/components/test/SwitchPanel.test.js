import React from 'react';
import { Switch } from 'react-native';
import { create } from 'react-test-renderer';
import SwitchPanel from '../SwitchPanel';

describe('SwitchPanel', () => {
  it('renders', () => {
    const component = create(<SwitchPanel />);
    expect(component.toJSON()).toBeTruthy();
  });

  it('is disabled by default', () => {
    const component = create(<SwitchPanel />);

    const switchComponent = component.root.findByType(Switch);
    const switchValue = switchComponent.props.value;

    expect(switchValue).toBeFalsy();
  });

  it('is enabled when switchEnabled is true', () => {
    const component = create(<SwitchPanel switchEnabled={true} />);

    const switchComponent = component.root.findByType(Switch);
    const switchValue = switchComponent.props.value;

    expect(switchValue).toBeTruthy();
  });

  // it('changes Switch state after pressing it', () => {
  //   const component = create(<SwitchPanel />);
  //   const instance = component.getInstance();
  //   const switchComponent = component.root.findByType(Switch);

  //   const switchValueBeforeClick = switchComponent.props.value;
  //   instance.onPress(!switchValueBeforeClick);
  //   const switchValueAfterClick = switchComponent.props.value;

  //   expect(switchValueBeforeClick).toBe(!switchValueAfterClick);
  // });
});
