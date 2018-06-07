import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, Dimensions, View, ViewPropTypes, Image, Platform } from 'react-native';
import Color from './Color';

function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}
export default class Actions extends React.Component {

  constructor(props) {
    super(props);
    this.onActionsPress = this.onActionsPress.bind(this);
  }

  onActionsPress() {
    const options = Object.keys(this.props.options);
    const cancelButtonIndex = Object.keys(this.props.options).length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        tintColor: this.props.optionTintColor,
      },
      function handle(buttonIndex) {
        let i = 0;
        Object.keys(this.props.options).forEach(function launch(key) {
          if (this.props.options[key]) {
            if (buttonIndex === i) {
              this.props.options[key](this.props);
              return;
            }
            i += 1;
          }
        });
      },
    );
  }

  render() {
    return (
      <TouchableHighlight
        style={[styles.container, this.props.containerStyle]}
        onPress={this.props.onPressActionButton || this.onActionsPress}
      >
      <Image
        style={styles.button}
        source={require('./../assets/img/tools.png')}
      />
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 20,
    marginBottom: 10,
  },
  button: {
    width: Platform.OS === 'ios' ? vw(13) : vw(13),
    height: Platform.OS === 'ios' ? vh(4) : vh(4.1),
  },
  wrapper: {
    borderRadius: 13,
    borderColor: Color.defaultColor,
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: Color.defaultColor,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: Color.backgroundTransparent,
    textAlign: 'center',
  },
});

Actions.contextTypes = {
  actionSheet: PropTypes.func,
};

Actions.defaultProps = {
  onSend: () => { },
  options: {},
  optionTintColor: Color.optionTintColor,
  icon: null,
  containerStyle: {},
  iconTextStyle: {},
  wrapperStyle: {},
};

Actions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  optionTintColor: PropTypes.string,
  icon: PropTypes.func,
  onPressActionButton: PropTypes.func,
  wrapperStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
};
