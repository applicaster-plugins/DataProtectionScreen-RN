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
        backgroundViewColor: null,
        buttonTrackColor: null,
        switchPanelColor: null,
        switchPanelTextSize: null,
        switchPanelTextColor: null,
        switchPanelText: null,
        url: null
      }
    };
    this.getInitialData();
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  async getInitialData() {
    try {
      const generalConfig = await getPluginConfig();
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
        switchPanelColor,
        buttonTrackColor,
        switchPanelTextSize,
        switchPanelTextColor,
        url: uri,
        switchPanelText
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
              buttonTrackColor,
              switchPanelText,
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
