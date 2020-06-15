import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, AsyncStorage, SafeAreaView } from 'react-native';
import ContactsComponent from './ContactsComponent';
import { withNavigation } from 'react-navigation';
import { withGlobalContext } from '../UserContext';
import { db } from '../firebase.js';
import {PreloadContacts} from '../preload/PreloadComponents'
const Preload = () => (
  <PreloadContacts />
);
class ListContacts extends Component {
  state = {
    text: '',


  };
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      items: false,
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;

  }
  getData = async () => {
    let account = this.props.global.account
    console.log("cuenta", account)
    try {
      let itemsRef = db.ref('/users/user' + account + '/contacts');
        itemsRef.on('value', snapshot => {
        let data = snapshot.val();
        if(data != null){
          let items = Object.values(data);
          this.setState({ items:items });
        }
        else{
          this.setState({ items:data });
        }
        console.log("contactos descargados")

      })

    } catch (e) {
      // error reading value
      console.log("error en list constactos", e)

    }
  }
  componentDidMount() {
    this.getData()

  }

  render() {
    console.log("contactos ", this.state.items)
    return (

      <View style={styles.container}>
        {this.state.items != false ? (
          <View>
          {
            this.state.items != null ? (
              <ContactsComponent items={this.state.items} />

            ) : (
                <View style={styles.cont}>
                  <Text style={{ margin: 10 ,color:'#A0A0A0'}}>No hay contactos</Text>

                </View>
              )
          }
          </View>
        ) : (
            <SafeAreaView style={styles.cont}>
              <Preload />
              <Preload />
              <Preload />
              <Preload />
            </SafeAreaView>
          )}
      </View>
    );
  }
}
export default withGlobalContext(ListContacts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 50,

  },
  cont: {
    height: '100%',
    alignItems: 'center',
    padding: 10
  }
});