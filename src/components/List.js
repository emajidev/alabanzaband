import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Platform, AsyncStorage, NetInfo, Alert, SafeAreaView } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { Notifications } from 'expo';
import { withNavigation } from 'react-navigation';
import * as firebase from "firebase/app";
import { AppColors } from './global'
import chordpro from './funtion/chordpro.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PreloadContacts } from './preload/PreloadComponents'
import Searcher from './searcher/Searcher'
const Preload = () => (
  <PreloadContacts />
);
class List extends Component {
  constructor(props){
    super(props)
    this.returnSongs = this.returnSongs.bind(this)
    this.state={
      returnSongs:''
    }
  }
  returnSongs(data){
    console.log('data',data)
    this.setState({returnSongs:data})
  }
  render() {
    return (
      <View style={{ flex: 1, width: '100%', height: '100%'}}>
        {this.props.songs != null ? (

          <View >
            
            <Searcher songsDb={this.props.songs} returnSongs ={this.returnSongs} />
           
              <ItemComponent items={this.state.returnSongs} />
           
          </View>
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