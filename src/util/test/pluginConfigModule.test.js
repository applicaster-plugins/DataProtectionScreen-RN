import { NativeModules } from 'react-native';
import { getPluginConfig } from '../pluginConfigModule';

jest.mock('NativeModules', () => {
  return {
    ZappPlugin: {
      getConfiguration: jest.fn(),
      configuration: {
        backgroundViewColor: '#ffffff',
        buttonTrackColor: '#ffffff',
        switchPanelColor: '#ffffff',
        switchPanelTextSize: '12',
        switchPanelTextColor: '#000000',
        switchPanelText: 'Tracking',
        url: 'https://google.com'
      }
    }
  };
});

NativeModules.ZappPlugin.getConfiguration.mockImplementation(
  pluginId =>
    new Promise((resolve, reject) => {
      if (pluginId === 'DataProtectionScreen-RN') {
        resolve(NativeModules.ZappPlugin.configuration);
      }

      reject(new Error('error'));
    })
);

describe('getPluginConfig', () => {
  it('exists', () => {
    expect(getPluginConfig).toBeTruthy();
  });

  it('should resolve promise when correct plugin Id is provided', async () => {
    expect.assertions(1);
    const currentResult = await getPluginConfig('DataProtectionScreen-RN');
    expect(currentResult).toBeTruthy();
  });

  it('should reject promise when incorrect plugin Id is provided', async () => {
    expect.assertions(1);
    try {
      await getPluginConfig('Wrong plugin id');
    } catch (e) {
      expect(e.message).toMatch('error');
    }
  });

  it('should return plugin configuration', async () => {
    expect.assertions(1);
    const currentResult = await getPluginConfig('DataProtectionScreen-RN');
    expect(currentResult).toEqual(NativeModules.ZappPlugin.configuration);
  });
});
