import { path, compose } from 'ramda';
import { argbToRgbaConverter, applyToKeys } from './general';

const colorConfigKeys = [
  'switchPanelColor',
  'switchPanelTextColor',
  'onTintColor',
  'tintColor',
  'thumbTintColor'
];

export const getPluginConfig = compose(
  applyToKeys(colorConfigKeys, argbToRgbaConverter),
  path(['extra_props', 'uibuilder_screen_model', 'data'])
);
