import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, TouchableHighlight, Image, View, ViewPropTypes, Platform } from 'react-native';
import Color from './Color';

function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}


export default function SeeU({ text }) {
  if (text.trim().length > 0) {
    return(
      <TouchableHighlight style={styles.seeContain} onPress={ () =>{ this.seeuMessage = true; mensaje.onSend(mensaje); }}>
          <Image resizeMode={'contain'} style={styles.btnSend}
                 source={require('./../assets/img/seeu.png')}
          />
      </TouchableHighlight>
    );
  }
  return <View/> ;
}

const styles = StyleSheet.create({
  seeContain: {
    position: 'relative',
    overflow: 'visible',
    marginRight: Platform.select({
      ios: 45,
      android: 50,
    }),
    marginBottom: 38,
    width: 2,
    height: 2
  },
  btnSend: {
    width: Platform.select({
      ios: vw(56),
      android: vw(56),
    }),
    height: Platform.select({
      ios: vh(5),
      android: vh(5),
    }),
  },
});

SeeU.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  children: null,
};

SeeU.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
};
