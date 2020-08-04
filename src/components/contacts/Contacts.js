import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import ListContacts from './ListContacts.js'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactsIcon from 'react-native-vector-icons/AntDesign';
import { withNavigation } from 'react-navigation';


class Contacts extends React.Component {
  addContacts(){
    return(
      <TouchableOpacity style={styles.btn_nav}>
      <Icon
        name='person-add'
        color='#A0A0A0'
        onPress={() => this.props.navigation.navigate('AddContacts')}
        size={30}

      />
    </TouchableOpacity>
    )
  }

  render() {
    const theme = this.props.theme
    return (
      <View style={styles.container}>
        <View style={styles.header} >
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={styles.title}> Miembros</Text>
          </View>
          <View style={styles.iconnavbar}>
          {/* {this.addContacts()} */}
          </View>
        </View>
        <View style={styles.body} >
          <ListContacts />
        </View>

      </View>
    );
  }
}
export default withNavigation(Contacts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn_nav: {
    paddingRight: 15
  },

  iconMenu: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  iconnavbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    height: '100%',
    backgroundColor: '#fff',
    marginTop:10

  },

  title: {
    color: '#A0A0A0',
    fontSize: 20,
    margin: 10

  },
});