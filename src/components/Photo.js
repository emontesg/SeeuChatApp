import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, Image, View, ViewPropTypes } from 'react-native';
import Color from './Color';

export default function Photo({ text }) {
  if (text.trim().length > 0) {
    return <View />
  }
  return (
    <TouchableHighlight style={styles.cameraContainer}>
      <Image
        style={styles.button}
        source={require('./../assets/img/camera.png')}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 24,
  },
  cameraContainer: {
    marginRight: 20,
    marginBottom: 10
  },
});

Photo.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  children: null,
};

Photo.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
};
