import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,AsyncStorage} from 'react-native';
import ContactsComponent from './ContactsComponent';
import { withNavigation } from 'react-navigation';

import { db } from './firebase.js';


class ListContacts extends Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    this._isMounted = false;

    this.state={
      items: [],
    }
  }
componentWillUnmount() {
   this._isMounted = false;
}
componentDidMount() {
    this._isMounted = true;
  
}
  getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      if(newData.phone !== null) {
        // value previously stored
        let itemsRef = db.ref('/users/user'+newData.phone+'/contacts' );
        itemsRef.on('value', snapshot => {
          try{
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({ items });
          }catch(e){
            console.log("error en list constactos",e)
          }
         
        });
      }
   
    } catch(e) {
      // error reading value
      console.log("error en list constactos",e)
  
    }
  }
componentDidMount() {
    this.getData()
   
  }

render() {
    
   
    return (
     
      <View style={styles.container}>
        {this.state.items.length > 0 ? (
          
          <ContactsComponent items={this.state.items} />
        ) : (
          <View style={styles.cont}>
            <Text style={{margin:10}}>No hay contactos</Text>
           
          </View>
        )}
      </View>
    );
  }
}
export default withNavigation(ListContacts);

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