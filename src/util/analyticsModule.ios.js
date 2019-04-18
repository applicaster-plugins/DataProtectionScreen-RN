import { NativeModules } from 'react-native';

export const getAnalyticsStatus = () =>
  new Promise(resolve => {
    NativeModules.ZPReactNativeBridgeListener.postEvent(
      'is_analytics_enabled',
      {},
      resolve
    );
  });
export const setAnalyticsStatus = analyticsEnabled =>
  new Promise(resolve => {
    NativeModules.ZPReactNativeBridgeListener.postEvent(
      'set_analytics_enabled',
      { analyticsEnabled },
      resolve
    );
  });
