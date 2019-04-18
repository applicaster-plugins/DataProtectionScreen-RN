import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Switch, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
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
      switchEnabled
    } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: switchPanelColor }]}>
        <Text
          style={{
            fontSize: Number(switchPanelTextSize),
            color: switchPanelTextColor
          }}
        >
          {switchPanelText}
        </Text>
        <Switch
          {...{
            value: switchEnabled,
            onTintColor,
            thumbTintColor,
            tintColor
          }}
          onValueChange={() => this.onPress(!switchEnabled)}
        />
      </View>
    );
  }
}

SwitchPanel.propTypes = {
  switchEnabled: PropTypes.bool,
  switchPanelColor: PropTypes.string,
  switchPanelText: PropTypes.string,
  switchPanelTextSize: PropTypes.string,
  switchPanelTextColor: PropTypes.string,
  handleSwitchChange: PropTypes.func,
  onTintColor: PropTypes.string,
  tintColor: PropTypes.string,
  thumbTintColor: PropTypes.string
};

SwitchPanel.defaultProps = {
  switchEnabled: false
};

export default SwitchPanel;
