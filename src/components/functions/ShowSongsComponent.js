import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Platform, AsyncStorage, NetInfo, Alert, SafeAreaView } from 'react-native';
import ItemComponent from '../ItemComponent';
import { withNavigation } from 'react-navigation';

class ShowSongsComponent extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1, width: '100%', height: '100%'}}>
         <View >
         {this.props.songs.length > 0 ? (
          <ItemComponent items={this.props.songs} />

         ):(
          <Text style={{textAlign:'center',color:'#a6a6a6'}}>No hay canciones seleccionadas </Text>
         )

         }       
           
          </View>
      </View>
    );
  }
}
export default withNavigation(ShowSongsComponent);

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