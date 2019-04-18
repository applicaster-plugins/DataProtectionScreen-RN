import React from 'react';
import { NativeModules, Switch } from 'react-native';
import { create } from 'react-test-renderer';
import { keys, pick, compose, omit } from 'ramda';
import App from '../App';
import SwitchPanel from '../components/SwitchPanel';

jest.mock('WebView', () => 'WebView');

jest.mock('NativeModules', () => {
  return {
    ZPReactNativeBridgeListener: {
      postEvent: jest.fn(),
      status: true
    }
  };
});
const extra_props = {
  uibuilder_screen_model: {
    data: {
      switchPanelColor: '#ffffff',
      switchPanelTextSize: '12',
      switchPanelTextColor: '#000000',
      switchPanelText: 'Tracking',
      url: 'https://google.com',
      switchPanelPosition: 'top',
      switchPanelIosFont: 'iosFont',
      switchPanelAndroidFont: 'AndroidFont',
      onTintColor: 'red',
      tintColor: 'green',
      thumbTintColor: 'blue'
    }
  }
};

NativeModules.ZPReactNativeBridgeListener.postEvent.mockImplementation(
  (event, { analyticsEnabled }, callback) => {
    const { status } = NativeModules.ZPReactNativeBridgeListener;
    switch (event) {
      case 'is_analytics_enabled':
        callback(status);
        break;
      case 'set_analytics_enabled':
        NativeModules.ZPReactNativeBridgeListener.status = analyticsEnabled;
        callback(status);
        break;
      default:
        return 'test';
    }
  }
);

describe('App component', () => {
  it('should return null on initial render', () => {
    const component = create(<App />);
    expect(component.toJSON()).toBe(null);
  });

  it('should return components after initial load is finished', async () => {
    expect.assertions(1);
    const component = create(<App {...{ extra_props }} />);
    const instance = component.getInstance();

    await instance.getInitialData();
    expect(component.toJSON()).toBeTruthy();
  });

  it('loads initial data', async () => {
    expect.assertions(1);
    const component = create(<App {...{ extra_props }} />);
    const instance = component.getInstance();

    await instance.getInitialData();
    expect(instance.state.generalConfig).toEqual(
      extra_props.uibuilder_screen_model.data
    );
  });

  it('should change switch value on handleSwitchChange', async () => {
    expect.assertions(1);
    const component = create(<App {...{ extra_props }} />);
    const instance = component.getInstance();
    await instance.getInitialData();
    const switchComponent = component.root.findByType(Switch);

    const switchInitialStatus = switchComponent.props.value;
    await instance.handleSwitchChange(!switchInitialStatus);

    expect(switchComponent.props.value).toBe(!switchInitialStatus);
  });

  it('passes styles config to the switchPanel', async () => {
    const component = create(<App {...{ extra_props }} />);
    const instance = component.getInstance();
    await instance.getInitialData();
    const switchPanelComponent = component.root.findByType(SwitchPanel);
    const configKeys = keys(extra_props.uibuilder_screen_model.data);
    const unusedConfigFields = ['url', 'switchPanelPosition'];
    const switchPanelConfigProps = compose(
      omit(unusedConfigFields),
      pick(configKeys)
    )(switchPanelComponent.props);

    expect(switchPanelConfigProps).toEqual(
      omit(unusedConfigFields, extra_props.uibuilder_screen_model.data)
    );
  });
});
