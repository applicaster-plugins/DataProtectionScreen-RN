import { NativeModules } from 'react-native';

export const getPluginConfig = (pluginId = 'DataProtectionScreen-RN') =>
  NativeModules.ZappPlugin.getConfiguration(pluginId);
