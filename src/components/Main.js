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
import { db } from "./firebase";

import { PushNotifications } from "./notifications/PushNotifications";
import base64 from "Base64";
import { Root } from 'native-base';
import * as Font from 'expo-font';
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
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.registerForPushNotificationsAsync();
      this.getStore();
      this.store_profile_Information()
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
      setTimeout(() => {
        this.setState({ loading: true });
      }, 5000);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  storeData = async (data) => {
    try {
      console.log("STORAGE",data)

      await AsyncStorage.setItem(
      'PROFILE_INFO',
      JSON.stringify(data)
      );
    } catch (error) {
      // Error saving data
      console.log("ERROR EN GUARDAR EN STORAGE",error)
    }
  };
  store_profile_Information() {
      let yourEmail  =  firebase.auth().currentUser.email;
      let convertMd5 =  Base64.btoa(yourEmail);
      let ref =  db.ref("/uploads/photo" + convertMd5 + "/profile/");
      ref.on("value", (snapshot) => {
        let data = snapshot.val();
        if (data !== null) {
          this.storeData(data)
        }
      });
  
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
          <Root>
            <Home />
          </Root>

      </UserProvider>
    );
  }
}
export default withGlobalContext(Main);
