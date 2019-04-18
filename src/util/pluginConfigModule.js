import { path } from 'ramda';

export const getPluginConfig = path([
  'extra_props',
  'uibuilder_screen_model',
  'data'
]);
