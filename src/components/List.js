import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, FlatList, Animated, TouchableOpacity, Platform, AsyncStorage, NetInfo, Alert, SafeAreaView } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { Notifications } from 'expo';
import { withNavigation } from 'react-navigation';
import * as firebase from "firebase/app";
import Icon from 'react-native-vector-icons/Entypo';
import chordpro from './funtion/chordpro.js';
import { PreloadContacts } from './preload/PreloadComponents'
import Searcher from './searcher/Searcher'
const Preload = () => (
  <PreloadContacts />
);
var category = [
  'Coros por tematica',
  'Coro espíritu santo',
  'Coro misionero',
  'Coros con acordes']
class List extends Component {
  constructor(props) {
    super(props)
    this.returnSongs = this.returnSongs.bind(this)
    this.state = {
      returnSongs: '',
      animate: new Animated.Value(-600),
      animateXY: new Animated.ValueXY({ x: 0, y: 0 })
    }
  }
  componentWillMount() {

  }
  openMenu() {
    Animated.sequence([])
    Animated.timing(this.state.animate, {
      toValue: 0,
      duration: 500
    },
    ).start()
  }
  closeMenu() {
    Animated.sequence([])
    Animated.timing(this.state.animate, {
      toValue: -300,
      duration: 500
    },
    ).start()
  }
  returnSongs(data) {
    this.setState({ returnSongs: data })
  }
  render() {
    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
      {this.props.category?(
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.openMenu()}>
            <Icon
              color='#hsl(144, 15%, 87%)'
              name='dots-three-horizontal'
              size={50}
            />
          </TouchableOpacity>
          <Animated.View style={{
          position: 'absolute',
          width: '100%',

          backgroundColor: '#F9F9F9',
          zIndex: 1,
          elevation: 1,
          transform: [
            { translateY: this.state.animate },
          ],
        }}
        >
          <View>
            <View style={{ height: 50, justifyContent: 'center', backgroundColor: '#f1f1f1' }}>
              <Text style={{ marginLeft: 10, color: '#555', textAlign: 'center' }}>Categorias</Text>
            </View>

            <FlatList
              data={category}
              enableEmptySections={true}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={{ margin: 10 }}>
                  <Text style={{ color: '#888' }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <View style={{alignItems:'center' }}>
              <TouchableOpacity style={{ margin: 10 }} onPress={() => this.closeMenu()}>
                <Icon
                  color='#hsl(144, 15%, 87%)'
                  name='chevron-small-up'
                  size={50}
                />
              </TouchableOpacity>
            </View>

          </View>

        </Animated.View>
        </View>
        
      ):(
        console.log('')
      )}
      
        {this.props.songs != null ? (
          <View >
            <Searcher songsDb={this.props.songs} returnSongs={this.returnSongs} hide={this.props.hide} />
            <ItemComponent items={this.state.returnSongs} mode={'listSongs'} />
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