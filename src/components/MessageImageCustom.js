/**
 * Created by jimmivila on 1/16/18.
 */
import PropTypes from 'prop-types';
import React from 'react';
import firebase from '.././firebase';
import {
    Image,
    StyleSheet,
    View,
    Platform,
    ViewPropTypes,
    Dimensions,
    TouchableHighlight,
    Text,
    Alert
} from 'react-native';
import Lightbox from 'react-native-lightbox';


function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}

export default class MessageImageCustom extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            timeLeft:5,
        }

    }

    tictac(seconds,elapsed){

        if (!elapsed) {
            elapsed = seconds * 1000;
        }else{
            elapsed = elapsed - 1000;
        }

        if(elapsed > 0){
            setTimeout(
                ()=>{
                    this.tictac(seconds,elapsed)
                    console.log('quedan: '+(elapsed/1000)+' segundos :)')
                    // this.timeLeft = elapsed/1000;
                    this.setState({
                        timeLeft : elapsed/1000
                    })
                }, 1000
            );
        }else{
            setTimeout(
                ()=>{
                    this.setState({
                        timeLeft: 0,
                    });

                    firebase.database().ref().update(this.props.didOpen());

                }, 1000
            );
        };
    }

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>

                <Lightbox
                    activeProps={{
                        style: styles.imageActive,
                    }}
                    {...this.props.lightboxProps}

                    didOpen={()=>{
                        if(this.props.didOpen()){
                            this.tictac(this.props.seconds,false)
                        }
                    }}
                    renderHeader={close => (
                      <View>
                        <TouchableHighlight style={styles.closeBtn} onPress={close}>
                          <Image
                            style={styles.button}
                            source={require('./../assets/img/closeSeeu.png')}
                          />
                        </TouchableHighlight>
                        <View style={styles.customHeaderBox}>
                            <Text style={styles.txtHeaderImage}>Sofi SeeU</Text>
                        </View>
                        <View style={styles.seeuTime}>
                          <Image
                            style={styles.button}
                            source={require('./../assets/img/seeuTime.png')}>
                          </Image>
                          <Text style={styles.time}>{this.state.timeLeft}</Text>
                        </View>
                      </View>
                    )}
                >

                      <Image
                          {...this.props.imageProps}
                          style={[styles.image, this.props.imageStyle]}
                          source={{uri: this.props.currentMessage.image}}
                      />
                </Lightbox>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    seeuTime:{
      position: 'relative',
      left: vw(540),
      bottom: vh(10),
      width: vw(75)
    },
    time: {
      position: 'relative',
      left: vw(25),
      bottom:   Platform.OS === 'ios' ? vh(5.5) :vh(6.5),
      color: 'white',
      fontFamily: 'GothamRounded-Book',
      fontSize: 20
    },
    closeBtn: {
      position: 'relative',
      top: vh(2),
      width: vw(75),
      backgroundColor: 'transparent',
      left: vw(15)
    },
    customHeaderBox: {
      position: 'relative',
      justifyContent: 'center',
      top: Platform.OS === 'ios' ? vh(-4) :vh(-5),
      left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
    },
    txtHeaderImage: {
      color: 'white',
      alignItems: 'center',
      fontSize: 21,
      fontFamily: 'GothamRounded-Book'
    },
    button: {
      height: vh(8),
      width: vw(76),
      resizeMode: 'contain'
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    imageActive: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
    },
});

MessageImageCustom.defaultProps = {
    currentMessage: {
        image: null,
    },
    containerStyle: {},
    imageStyle: {},
};

MessageImageCustom.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    imageStyle: Image.propTypes.style,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
    didOpen:PropTypes.func,
    seconds:PropTypes.string,
};
