import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput ,ActivityIndicator} from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from './firebase.js';

let itemsRef = db.ref('/items');

export default class List extends React.Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    this.state={
      search: '',
      items: [],
    }
  }

componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
      
    });
  }
  filterSearch(text){
    const filterItem = items.filter(function(item){
    const itemdata=  item.name.toUpperCase()
    const textData =  text.toUpperCase()
    return itemdata.indexOf(textData) > -1
 });
 this.setState({
   text:text,
   items : this.state.items.cloneWithRows(filterItem),
 })

  }
render() {
    
   
    return (
     
      <View style={styles.container}>
   
        {this.state.items.length > 0 ? (
          
          <ItemComponent items={this.state.items} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  cont:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
});