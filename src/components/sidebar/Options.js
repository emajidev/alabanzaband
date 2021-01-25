import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import * as firebase from "firebase/app";
import { withNavigation } from "react-navigation";
import { delete_all_todo } from "../SqliteDateBase";
import { withGlobalContext } from "../UserContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Container, Header, Content, Button, Text, View } from "native-base";
class Options extends Component {
  async logOut() {
    try {
      AsyncStorage.removeItem("@storage_Key");
      this.props.navigation.navigate("AuthLoading");
      this.props.global.setAccount("");
      this.props.global.setDirector("");
      this.props.global.setClrFriends([data.user]);

      firebase
        .auth()
        .signOut()
        .then(() => {
          //console.log('cerrar',this.props.global.account)
          AsyncStorage.clear().then(() => console.log("Cleared"));
        })
        .catch((error) => console.log("error en cerrar sesion", error));
    } catch (e) {
      console.log("Error al borrar asyncstorage", e);
    }
  }
  render() {
    return (
      <Container>
        <Content>
          {/*    <Button transparent>
            <Text>Noticias</Text>
          </Button> */}
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("MenuBand")}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon color="gray" name="guitar-electric" size={25} style={{ marginRight: 10, marginLeft: 10 }} />
              <Text>Banda</Text>
            </View>

          </Button>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("ScheduleEvents")}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon color="gray" name="calendar-text-outline" size={25} style={{ marginRight: 10, marginLeft: 10 }} />
              <Text>Cronograma</Text>
            </View>
          </Button>
          {/*       <Button
            transparent
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <Text>Unirte a banda</Text>
          </Button> */}
          {/*           <Button
            transparent
            onPress={() => {
              this.props.navigation.navigate("AddItem");
            }}
          >
            <Text>Añadir Canciones</Text>
          </Button> */}
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("ListChat")}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon color="gray" name="chat" size={25} style={{ marginRight: 10, marginLeft: 10 }} />
              <Text>chats</Text>
            </View>
          </Button>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon color="gray" name="cellphone-settings" size={25} style={{ marginRight: 10, marginLeft: 10 }} />
              <Text>Configuracion</Text>
            </View>
          </Button>

          {/*    <Button transparent>
            <Text>Ayuda</Text>
          </Button> */}
          <Button transparent onPress={() => this.logOut()}>
            <View style={{ flexDirection: "row" }}>
              <Icon color={[this.props.global.color.color]} name="exit-to-app" size={25} style={{ marginRight: 10, marginLeft: 10 }} />
              <Text
                style={{ color: [this.props.global.color.color], fontSize: 18 }}
              >
                Salir
            </Text>
            </View>
          </Button>
          {/*      <Button transparent onPress={()=> delete_all_todo()}>
            <Text>borrar bd task</Text>
          </Button> */}
        </Content>
      </Container>
    );
  }
}
export default withGlobalContext(withNavigation(Options));
