import React, { Component } from 'react';
// import Reactotron from 'reactotron-react-native';
import { View, Dimensions, Image, Platform, TouchableHighlight, Text } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';

// function vw(percentageWidth) {
//   return Dimensions.get('window').width * (percentageWidth / 100);
// }

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

class CameraScreen extends Component {
  state = {photo: null};

  constructor() {
    super();
  }

  componentDidMount() {
    console.log('componentDidMount');
    // this.takePicture();

    setTimeout(() => {
      this.takePicture();
    }, 100);

  }

  render() {
    console.log('render');
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.temp}
          type={Camera.constants.Type.front}>
        </Camera>
        <View style={styles.hide}>
          {
            this.state.photo !== null ?
              <Image source={{uri:this.state.photo}} style={styles.photo}></Image>
            : null}
        </View>
        {/*<Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>*/}
      </View>
    );
  }

  takePicture() {
    console.log('take a picture');
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {this.setState({photo: data.path}); console.log('AQUI SI EJECUTA ALGO NO ME VENGAN CON VARAS',data.path)})
      .catch(err => console.log(err));
    console.log('finish take a picture');
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  hide: {
    position: 'absolute',
    width: vw(640),
    height: vh(100),
    backgroundColor: '#fff'
  },
  photo: {
    width: vw(640),
    height: vh(100),
  }
};

export default CameraScreen;
