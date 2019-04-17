import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Switch, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});

class SwitchPanel extends Component {
  onPress(newSwitchState) {
    this.props.handleSwitchChange(newSwitchState);
  }

  render() {
    const {
      switchEnabled,
      switchPanelColor,
      switchPanelText,
      switchPanelTextSize,
      switchPanelTextColor,
      buttonTrackColor: trackColor
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: switchPanelColor }]}>
        <Text>{switchPanelText}</Text>
        <Switch
          {...{ value: switchEnabled, trackColor }}
          onValueChange={() => this.onPress(!switchEnabled)}
        />
      </View>
    );
  }
}

SwitchPanel.propTypes = {
  switchEnabled: PropTypes.bool,
  switchPanelColor: PropTypes.string,
  buttonTrackColor: PropTypes.string,
  switchPanelText: PropTypes.string,
  switchPanelTextSize: PropTypes.string,
  switchPanelTextColor: PropTypes.string,
  handleSwitchChange: PropTypes.func
};

SwitchPanel.defaultProps = {
  switchEnabled: false
};

export default SwitchPanel;
