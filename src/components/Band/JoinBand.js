import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity,StyleSheet } from "react-native";
import * as firebase from "firebase/app";
import { db } from "../firebase";
import AvatarBands from "./AvatarBands";
import { List, ListItem } from "native-base";

export default class JoinBand extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    this.listBands();
  }
  listBands() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      let ref = db.ref("/bands/");
      ref.on("value", (snapshot) => {
        // ultimo evento compartido
        let data = snapshot.val(); 

        if (data != null) {
          let list = Object.values(data);
          this.setState({ list });
        }
      });
    }
  }
  
  render() {
    const list = this.state.list;
    const join = true;
    console.log("LIST", list);

    return (
      <View style={styles.listBands}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            
            <List style={styles.List}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("BandProfile",{item,join})}
              >
              <AvatarBands
                    email={item.bandName}
                    name={item.bandName}
                    id={item.id}
                    showUserName={true}
                    showUser={true}
                  />
            
              </TouchableOpacity>
            </List>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    listBands:{
        marginTop:20
    },
    List: {
     paddingLeft:20
    }
})