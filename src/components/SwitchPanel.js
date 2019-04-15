import React, { Component } from 'react';
import { View, Switch } from 'react-native';
import PropTypes from 'prop-types';

class SwitchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchEnabled: props.switchEnabled
    };
  }

  handleSwitchPress(newSwitchState) {
    this.setState({ switchEnabled: newSwitchState });
  }

  render() {
    const { switchEnabled } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Switch
          {...{ value: switchEnabled }}
          onValueChange={() => this.handleSwitchPress(!switchEnabled)}
        />
      </View>
    );
  }
}

SwitchPanel.propTypes = {
  switchEnabled: PropTypes.bool
};

SwitchPanel.defaultProps = {
  switchEnabled: false
};

export default SwitchPanel;
