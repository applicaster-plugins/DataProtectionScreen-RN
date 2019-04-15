import { getAnalyticsStatus, setAnalyticsStatus } from '../analyticsModule';
import { NativeModules } from 'react-native';

jest.mock('NativeModules', () => {
  return {
    ZPReactNativeBridgeListener: {
      postEvent: jest.fn(),
      status: true
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

describe('getAnalyticsStatus', () => {
  it('returns analytics status', async () => {
    expect.assertions(1);
    const currentResult = await getAnalyticsStatus();
    expect(currentResult).toBe(
      NativeModules.ZPReactNativeBridgeListener.status
    );
  });
});

describe('setAnalyticsStatus', () => {
  it('Sets analytics status to false', async () => {
    expect.assertions(1);
    await setAnalyticsStatus(false);
    expect(NativeModules.ZPReactNativeBridgeListener.status).toBe(false);
  });
  it('Sets analytics status to true', async () => {
    expect.assertions(1);
    await setAnalyticsStatus(true);
    expect(NativeModules.ZPReactNativeBridgeListener.status).toBe(true);
  });
});
