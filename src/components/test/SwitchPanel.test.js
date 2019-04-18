import React from 'react';
import { Switch, StyleSheet } from 'react-native';
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

  it('should display text passed in switchPanelText prop', () => {
    const component = create(
      <SwitchPanel {...{ switchPanelText: 'fooBar' }} />
    );
    const textComponent = component.root.findByType('Text');

    expect(textComponent.props.children).toBe('fooBar');
  });

  it('changes switch on Tint Color when onTintColor is provided', () => {
    const onTintColor = 'red';
    const component = create(<SwitchPanel {...{ onTintColor }} />);
    const switchComponent = component.root.findByType(Switch);

    expect(switchComponent.props.onTintColor).toBe(onTintColor);
  });

  it('changes switch thumb Tint Color when thumbTintColor is provided', () => {
    const thumbTintColor = 'red';
    const component = create(<SwitchPanel {...{ thumbTintColor }} />);
    const switchComponent = component.root.findByType(Switch);

    expect(switchComponent.props.thumbTintColor).toBe(thumbTintColor);
  });

  it('changes switch Tint Color when tintColor is provided', () => {
    const tintColor = 'red';
    const component = create(<SwitchPanel {...{ tintColor }} />);
    const switchComponent = component.root.findByType(Switch);

    expect(switchComponent.props.tintColor).toBe(tintColor);
  });

  it('changes view background color if switchPanelColor provided', () => {
    const switchPanelColor = 'red';
    const component = create(<SwitchPanel {...{ switchPanelColor }} />);
    const viewContainer = component.root.findByType('View');
    const viewContainerStyle = StyleSheet.flatten(viewContainer.props.style);
    expect(viewContainerStyle.backgroundColor).toBe(switchPanelColor);
  });

  it('changes text size if switchPanelTextSize provided', () => {
    const switchPanelTextSize = '18';
    const component = create(<SwitchPanel {...{ switchPanelTextSize }} />);
    const textComponent = component.root.findByType('Text');
    expect(String(textComponent.props.style.fontSize)).toBe(
      switchPanelTextSize
    );
  });

  it('changes text color if switchPanelTextColor provided', () => {
    const switchPanelTextColor = 'red';
    const component = create(<SwitchPanel {...{ switchPanelTextColor }} />);
    const textComponent = component.root.findByType('Text');
    expect(textComponent.props.style.color).toBe(switchPanelTextColor);
  });
});
