import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput ,ActivityIndicator,Platform,AsyncStorage,NetInfo,Alert,SafeAreaView} from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { Notifications} from 'expo';
import { withNavigation } from 'react-navigation';
import * as firebase from "firebase/app";
import {AppColors}from './global'
import chordpro from './funtion/chordpro.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {PreloadContacts} from './preload/PreloadComponents'

const Preload = () => (
  <PreloadContacts />
);
class List extends Component {
 
render() {
    return (
      <View style={{flex:1,width:'100%',height:'100%',position:'relative'}}>
        {this.props.songs != null  ? (
          <ItemComponent items={this.props.songs}/>
        ) : (
          <View>
            <Text>no found</Text>
          </View>
        )}
      </View>
    );
  }
}
export default withNavigation(List);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    

  },
  cont: {
    height: '100%',
    alignItems: 'center',
    padding: 10
  }
});