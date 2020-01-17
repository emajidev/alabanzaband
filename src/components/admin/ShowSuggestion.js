import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ActivityIndicator,AsyncStorage} from 'react-native';
import SuggestionComponent from './SuggestionComponent';

import { db } from '../firebase';


export default class ShowSuggestion extends Component {

  constructor(props){
    super(props);
    this.state={
      items: [],
    }
  }
  getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      if(newData.phone !== null) {
        // value previously stored
        let itemsRef = db.ref('/suggestion' );
        itemsRef.on('value', snapshot => {
          let data = snapshot.val();
          if(data !== null){  
            let items = Object.values(data);
            this.setState({ items });
            console.log("tamaño de Suggestion",items.length)
          }else[
            console.log("no hay Suggestion")
          ]
        });
      }
    } catch(e) {
      // error reading value
      console.log("error Suggestion list",e)
    }
  }
componentDidMount() {
   this.getData()
  }

render() {
    
   
    return (
     
      <View style={styles.container}>
        <Text>Sugerencias</Text>
        {this.state.items.length > 0 ? (
          
          <SuggestionComponent items={this.state.items} />
        ) : (
          <View style={styles.cont}>
            <Text style={{margin:10}}>No hay sugerencias</Text>
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
    marginTop:StatusBar.currentHeight+15,

  },
  cont:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
});