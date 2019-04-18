import { NativeModules } from 'react-native';

export const getAnalyticsStatus = () =>
  NativeModules.APReactNativeBridge.handleCommand(
    'is_analytics_enabled',
    {}
  ).then(analyticsEnabled => Promise.resolve(analyticsEnabled === 'true'));

export const setAnalyticsStatus = analyticsEnabled =>
  new Promise(resolve => {
    NativeModules.APReactNativeBridge.handleCommand('set_analytics_enabled', {
      analyticsEnabled
    });
    resolve(analyticsEnabled);
  });
