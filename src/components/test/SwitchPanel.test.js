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

  it('calls parent handleSwitchChange on switchValue change', () => {
    const handleSwitchChange = jest.fn();
    const component = create(<SwitchPanel {...{ handleSwitchChange }} />);
    const instance = component.getInstance();

    instance.onPress(true);

    expect(handleSwitchChange).toBeCalledWith(true);
  });
});
