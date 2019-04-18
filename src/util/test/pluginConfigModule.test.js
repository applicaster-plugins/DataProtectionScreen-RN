import { getPluginConfig } from '../pluginConfigModule';

const props = {
  extra_props: {
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
  }
};

describe('getPluginConfig', () => {
  it('exists', () => {
    expect(getPluginConfig).toBeTruthy();
  });

  it('should return plugin configuration', () => {
    const currentResult = getPluginConfig(props);
    expect(currentResult).toEqual(
      props.extra_props.uibuilder_screen_model.data
    );
  });
});
