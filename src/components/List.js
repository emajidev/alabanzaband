import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput ,ActivityIndicator,Platform,AsyncStorage,NetInfo,Alert,} from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { db } from './firebase.js';
import { Notifications} from 'expo';
import { withNavigation } from 'react-navigation';
import * as firebase from "firebase/app";
import {AppColors}from './global'
import chordpro from './funtion/chordpro.js';
import PouchDB from 'pouchdb-react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

class List extends Component {
 
render() {
    return (
      <View style={{flex:1,width:'100%',height:'100%',position:'relative'}}>
        {this.props.songs != null  ? (
          <ItemComponent items={this.props.songs}/>

        ) : (
          <View style={styles.cont}>
            <Text style={{margin:10}}>Buscando canciones...</Text>
            <ActivityIndicator size="large" />
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
  cont:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
});