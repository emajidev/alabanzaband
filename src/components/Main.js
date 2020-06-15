import React from "react";
import { Text, View, Image } from "react-native";
import Home from "./Home";
import { UserProvider } from "./UserContext";
import { withNavigation } from 'react-navigation'
import { AsyncStorage } from 'react-native';
import { insert_In_avatarUri, select_avatarUri } from './SqliteDateBase';
import { withGlobalContext } from './UserContext';
import SendNotifications from './notifications/Notifications'


class Main extends React.Component {
  constructor() {
    super();
    this._isMounted = false;

    this.state = {
      loading: false,
    };
  }

  getStore = async () => {
    console.log("store async")
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // We have data!!
        console.log("store get", value);
      } else {
        console.log("nullstore");
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getStore()
      setTimeout(() => {
        console.log("hola");
        this.setState({ loading: true });
      }, 5000);

    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
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
          backgroundColor: "#fff"
        }}
      >
        
        <Text style={{ fontSize: 20, margin: 20, letterSpacing: 15, color: "rgba(80,227,194,1)" }}>
          iniciando
        </Text>
      </View>
    );
  };
  render() {
    const user = { name: "Tania", loggedIn: true };
    /* <SendNotifications /> */
    return (
      <UserProvider value={user}>
        {this.state.loading == false
          ? this.Loading()
          : console.log("loading true")}
        <Home />
      </UserProvider>
    );
  }
}
export default withGlobalContext(Main);
