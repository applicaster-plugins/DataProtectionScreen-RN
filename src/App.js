import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { ErrorBoundary } from '@applicaster/london-rn-components';
import SwitchPanel from './components/SwitchPanel';
import { getPluginConfig } from './util/pluginConfigModule';
import { getAnalyticsStatus, setAnalyticsStatus } from './util/analyticsModule';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoad: true,
      analyticsEnabled: null,
      generalConfig: {
        url: null,
        switchPanelPosition: null,
        switchPanelColor: null,
        switchPanelText: null,
        switchPanelTextColor: null,
        switchPanelTextSize: null,
        switchPanelIosFont: null,
        switchPanelAndroidFont: null,
        onTintColor: null,
        tintColor: null,
        thumbTintColor: null
      }
    };
    this.getInitialData();
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  async getInitialData() {
    try {
      const generalConfig = getPluginConfig(this.props);
      const analyticsEnabled = await getAnalyticsStatus();
      this.setState({
        initialLoad: false,
        generalConfig,
        analyticsEnabled
      });
    } catch (err) {
      throw err;
    }
  }

  async handleSwitchChange(newAnalyticsStatus) {
    try {
      await setAnalyticsStatus(newAnalyticsStatus);
      this.setState({ analyticsEnabled: newAnalyticsStatus });
    } catch (err) {
      throw err;
    }
  }

  render() {
    const {
      analyticsEnabled,
      initialLoad,
      generalConfig: {
        url: uri,
        switchPanelPosition,
        switchPanelColor,
        switchPanelText,
        switchPanelTextColor,
        switchPanelTextSize,
        switchPanelIosFont,
        switchPanelAndroidFont,
        onTintColor,
        tintColor,
        thumbTintColor
      }
    } = this.state;

    if (initialLoad) {
      return null;
    }

    return (
      <ErrorBoundary>
        <View style={{ flex: 1 }}>
          <SwitchPanel
            {...{
              switchEnabled: analyticsEnabled,
              switchPanelColor,
              switchPanelText,
              switchPanelPosition,
              switchPanelIosFont,
              switchPanelAndroidFont,
              onTintColor,
              tintColor,
              thumbTintColor,
              switchPanelTextSize,
              switchPanelTextColor,
              handleSwitchChange: this.handleSwitchChange
            }}
          />
          <WebView source={{ uri }} />
        </View>
      </ErrorBoundary>
    );
  }
}

export default App;
