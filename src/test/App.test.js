import React from 'react';
import { NativeModules, Switch } from 'react-native';
import { create } from 'react-test-renderer';
import App from '../App';
import SwitchPanel from '../components/SwitchPanel';

jest.mock('WebView', () => 'WebView');

jest.mock('NativeModules', () => {
  return {
    ZPReactNativeBridgeListener: {
      postEvent: jest.fn(),
      status: true
    },
    ZappPlugin: {
      getConfiguration: jest.fn(),
      configuration: {
        backgroundViewColor: '#ffffff',
        buttonTrackColor: '#ffffff',
        switchPanelColor: '#ffffff',
        switchPanelText: 'Tracking',
        url: 'https://google.com'
      }
    }
  };
});

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

NativeModules.ZappPlugin.getConfiguration.mockImplementation(
  pluginId =>
    new Promise((resolve, reject) => {
      if (pluginId === 'DataProtectionScreen-RN') {
        resolve(NativeModules.ZappPlugin.configuration);
      }

      reject(new Error('error'));
    })
);

describe('App component', () => {
  it('should return null on initial render', () => {
    const component = create(<App />);
    expect(component.toJSON()).toBe(null);
  });

  it('should return components after initial load is finished', async () => {
    expect.assertions(1);
    const component = create(<App />);
    const instance = component.getInstance();

    await instance.getInitialData();
    expect(component.toJSON()).toBeTruthy();
  });

  it('loads initial data', async () => {
    expect.assertions(1);
    const component = create(<App />);
    const instance = component.getInstance();

    await instance.getInitialData();
    expect(instance.state.generalConfig).toEqual(
      NativeModules.ZappPlugin.configuration
    );
  });

  it('should change switch value on handleSwitchChange', async () => {
    expect.assertions(1);
    const component = create(<App />);
    const instance = component.getInstance();
    await instance.getInitialData();
    const switchComponent = component.root.findByType(Switch);

    const switchInitialStatus = switchComponent.props.value;
    await instance.handleSwitchChange(!switchInitialStatus);

    expect(switchComponent.props.value).toBe(!switchInitialStatus);
  });
});
