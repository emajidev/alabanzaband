import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  AsyncStorage,
  SafeAreaView,
} from "react-native";
import ContactsComponent from "./ContactsComponent";
import { withNavigation } from "react-navigation";
import { withGlobalContext } from "../UserContext";
import { db } from "../firebase.js";
import { PreloadContacts } from "../preload/PreloadComponents";
import * as firebase from "firebase/app";

import { filterData, SearchType } from "filter-data";
import Base64 from "Base64";

const Preload = () => <PreloadContacts />;

const data = [
  {
    name: "Emanuel",
    userName: "emanuelyul@hotmail.com",
  },
];

function searcher(data, searchName) {
  const searchConditions = [
    {
      key: ["name"],

      value: searchName,

      type: SearchType.LK,
    },
  ];

  return filterData(data, searchConditions);
}

class ListContacts extends Component {
  state = {
    text: "",
  };

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      items: false,
      search: "",
    };
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }
  getData = async () => {
    let yourEmail  = await firebase.auth().currentUser.email;
    let convertMd5 = await Base64.btoa(yourEmail);

    try {
      let itemsRef = db.ref('/users/user'+ convertMd5 +'/'+'contacts/');
      itemsRef.on("value", (snapshot) => {
        let data = snapshot.val();
        if (data != null) {
          let items = Object.values(data);
          this.setState({ items: items });
        } else {
          this.setState({ items: data });
        }
        console.log("contactos descargados");
      });
    } catch (e) {
      // error reading value
      console.log("error en list constactos", e);
    }
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    console.log("contactos ", this.state.items);
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            padding: 10,
            width: "95%",
            borderRadius: 5,
            borderColor: "#e1e1e1",
            marginBottom: 20,
          }}
          placeholder="Buscar"
          onChangeText={(text) => this.setState({ search: text })}
          value={this.state.search}
        />
        {this.state.items != false ? (
          <View>
            {this.state.items != null ? (
              <ContactsComponent
                items={searcher(this.state.items, this.state.search)}
              />
            ) : (
              <View style={styles.cont}>
                <Text
                  style={{
                    margin: 22,
                    color: "#A0A0A0",
                    fontSize: 18,
                    opacity: 0.5,
                  }}
                >
                  No se han registrado contactos por ahora ;({" "}
                </Text>
              </View>
            )}
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 50,
  },
  cont: {
    height: "100%",
    alignItems: "center",
    padding: 10,
  },
});

