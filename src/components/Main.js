import React from "react";
import { Text, View, Image } from "react-native";
import Home from "./Home";
import { UserProvider } from "./UserContext";
import { withNavigation } from "react-navigation";
import { AsyncStorage } from "react-native";
import { insert_In_avatarUri, select_avatarUri } from "./SqliteDateBase";
import { withGlobalContext } from "./UserContext";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import Base64 from "Base64";
import * as firebase from "firebase/app";

import { PushNotifications } from "./notifications/PushNotifications";
import base64 from "Base64";

class Main extends React.Component {
  constructor() {
    super();
    this._isMounted = false;

    this.state = {
      loading: false,
    };
  }

  getStore = async () => {
    console.log("store async");
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // We have data!!
        //console.log("store get", value);
      } else {
        console.log("nullstore");
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  pushFetch() {
    PushNotifications(this.state.expoPushToken);
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.registerForPushNotificationsAsync();
      this.getStore();
      setTimeout(() => {
        this.setState({ loading: true });
      }, 5000);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      //console.log(token);
      this.setState({ expoPushToken: token });
      var updates = {};
      updates["/expoToken"] = token;
      let currentUser = firebase.auth().currentUser.email;
      console.log("token", Base64.btoa(currentUser));
      (
        await firebase
          .database()
          .ref("/users/user" + Base64.btoa(currentUser) + "/profile")
      ).update(updates);
    } else {
    }
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };
  Loading = () => {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 2,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            margin: 20,
            letterSpacing: 15,
            color: "rgba(80,227,194,1)",
          }}
        >
          iniciando
        </Text>
      </View>
    );
  };
  addRow(data) {
    var key = firebase.database().ref("/contacts").push().key;
    firebase.database().ref("/contacts").child(key).set({ name: data });
  }
  render() {
    const user = { name: "Tania", loggedIn: true };
    return (
      <UserProvider value={user}>
        {this.state.loading == false
          ? this.Loading()
          : console.log("loading true")}
        {/* <TouchableOpacity onPress={() => this.pushFetch()}>
          <Text style={{ margin: 50 }}>agregar</Text>
        </TouchableOpacity> */}
        <Home />
      </UserProvider>
    );
  }
}
export default withGlobalContext(Main);
