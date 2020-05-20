import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, AsyncStorage, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation';
import CalendarTimeline from './calendar/CalendarTimeline';

import { withGlobalContext } from './UserContext';
import { db } from './firebase.js';
import { PreloadContacts } from './preload/PreloadComponents'
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
      items: null,
      waitTime: false,
      loadEvents: false
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
        if (data != null) {
          let items = Object.values(data);
          this.setState({ items: items });
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
      this.setState({ waitTime: true })
      this.checkLoad()

      
    }, 1000);
  }
  checkLoad() {
    if (this.state.items == null) {
      if (this.state.items == null && this.state.waitTime) {
        console.log("loadEvent activado")
        this.setState({ loadEvents: true })
      } else {
        console.log("loadEvent falso")

        this.setState({ loadEvents: false })
      }

     
    }
  }


  render() {
    console.log("contactos ", this.state.loadEvents)
    const empty = { title: '', dateStart: '', dateEnd: '', colorTag: '', uid: '', note: '', members: '', songs: '', groups: '' }

    return (

      <View style={styles.container}>
        {this.state.loadEvents != false ? (
          <View>
            {
              this.state.items != null ? (
                <View style={styles.cont}>
                  <CalendarTimeline items={this.state.items} />
                </View>
              ) : (
                  <View style={styles.cont}>
                  <CalendarTimeline items={this.state.items} />
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