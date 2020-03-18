import React from "react";
import { Text, View,Image } from "react-native";
import Home from "./Home";
import { UserProvider } from "./UserContext";
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      console.log("hola");
      this.setState({ loading: true });
    }, 5000);
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

        <Image
          style={{width:220, height: 180}}
          source={require('../img/logo.png')}
        />
        <Text style={{ fontSize: 20, margin:20, letterSpacing: 15,color: "rgba(80,227,194,1)" }}>
          cargando
        </Text>
      </View>
    );
  };
  render() {
    const user = { name: "Tania", loggedIn: true };

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
export default Main;
