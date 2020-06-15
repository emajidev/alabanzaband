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
      loadEvents: false,
      text: ''
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = async () => {
    this.setState({ items: this.props.infoTask });
  }

  async componentDidMount() {
    this._isMounted = true;
    this.getData();

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


    } else {
      this.setState({ loadEvents: true })
/*       console.log("eventos",this.state.items)
 */    }
  }


  render() {

    return (

      <View style={styles.container}>
        <CalendarTimeline infoTask={this.props.infoTask} />
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
    padding: 5
  }
});