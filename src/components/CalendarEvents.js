import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, AsyncStorage, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation';
import CalendarTimeline from './calendar/CalendarTimeline';

import { withGlobalContext } from './UserContext';
import { db } from './firebase.js';
import {PreloadContacts} from './preload/PreloadComponents'
const Preload = () => (
  <PreloadContacts />
);
class CalendarEvents extends Component {
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
      let itemsRef = db.ref('/users/user' + account + '/events');
        itemsRef.on('value', snapshot => {
        let data = snapshot.val();
        if(data != null){
          let items = Object.values(data);
          this.setState({ items:items });
        }
  
        console.log("contactos descargados")

      })

    } catch (e) {
      // error reading value
      console.log("error en list constactos", e)

    }
  }
 async componentDidMount() {
    this.getData()
    setTimeout(() => {
        this.getData();
      }, 1000);

    }

  

  render() {
    console.log("contactos ", this.state.items)
    return (

      <View style={styles.container}>
        {this.state.items != false ? (
          <View>
          {
            this.state.items != null ? (
                <View style={styles.cont}>
                <CalendarTimeline items={this.state.items} />

                </View>
            ) : (
                <View style={styles.cont}>
                  <Text style={{ margin: 10 ,color:'#A0A0A0'}}>No hay data</Text>

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
export default withGlobalContext(CalendarEvents);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  cont: {
    height: '100%',
    alignItems: 'center',
    padding: 5
  }
});