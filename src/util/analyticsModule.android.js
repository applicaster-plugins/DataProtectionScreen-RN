import { NativeModules } from 'react-native';

export const getAnalyticsStatus = () =>
  NativeModules.APReactNativeBridge.handleCommand('is_analytics_enabled', {});

export const setAnalyticsStatus = analyticsEnabled =>
  NativeModules.APReactNativeBridge.handleCommand('set_analytics_enabled', {
    analyticsEnabled
  });
