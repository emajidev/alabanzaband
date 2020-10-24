import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  AsyncStorage,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../styles/Styles";
import * as firebase from "firebase/app";
import * as Facebook from "expo-facebook";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { email: "", password: "", errorMessage: null };
  _Login = () => {
    this.props.navigation.navigate("Login");
  };
  getData = async () => {
    try {
      const data = await AsyncStorage.getItem("@storage_Key");
      let newData = JSON.parse(data);
      console.log("store", newData);
      if (newData != null) {
        console.log("consulta");

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("user is logged");
            this.props.navigation.navigate("Main");
          }
        });
        if (newData.user != null) {
          this.props.navigation.navigate("Main");
        }
      }
    } catch (e) {
      // error reading value
      console.log("error en list constactos", e);
    }
  };
  getAsyncStorage = async () => {
    try {
      const data = await AsyncStorage.getItem("@storage_Key");
      if (data != undefined) {
        return true;
      } else {
        return false;
      }
    } catch (e) {}
  };
  componentDidMount() {
    this.getData();
  }
  handleLoginFacebook = () => {
    this.loginWithFacebook();
  };

  async loginWithFacebook() {
    try {
      await Facebook.initializeAsync("2487421368013795");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert(
          "Sesion iniciada!",
          `Hola! ${(await response.json()).name}!`
        );
        const cred = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInWithCredential(cred)
          .then((result) => {
            // User signed in.
            console.log("redirecionar a formProfile");
            var token = result.credential.accessToken;
            this.props.navigation.navigate("FormProfile");
          })
          .catch((error) => {
            // Error occurred.
            console("error al iniciar facebook", error);
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              color: "#4b5b68",
              fontSize: 25,
              fontStyle: "italic",
              letterSpacing: 5,
              fontWeight: "bold",
            }}
          >
            AlabanzaBand
          </Text>
        </View>
        <View style={styles.content}>
          {/* <ImageBackground source={require('../img/bg.jpg')} style={localStyles.background} > */}

          <Text
            style={{
              color: "white",
              width: "80%",
              marginBottom: 40,
              fontSize: 14,
              fontWeight: "bold",
              letterSpacing: 2,
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Ingresa tu cuenta y disfruta de tu repertorio
          </Text>
          {this.state.errorMessage && (
            <Text style={{ color: "#fff" }}>
              datos invalidos{this.state.errorMessage}
              {console.log(this.state.errorMessage)}
            </Text>
          )}

          <TouchableOpacity style={styles.btn_sesion} onPress={this._Login}>
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
              Accede con tu correo electrónico
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_accept}
            onPress={this.handleLoginFacebook}
          >
            <Icon
              name="facebook"
              color="#fff"
              size={20}
              style={{ position: "absolute", left: 0, marginLeft: 30 }}
            ></Icon>
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                fontWeight: "bold",
                paddingLeft: 5,
              }}
            >
              Iniciar con Facebook
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
              style={{ alignItems: "center" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  textAlign: "center",
                }}
              >
                <Text style={{ color: "#ddd", fontSize: 16, marginTop: 15 }}>
                  ¿No tienes una cuenta?, toca aqui para{" "}
                  <Text style={{ color: "#10cb42" }}>crear una cuenta...</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* </ImageBackground> */}
        </View>
      </View>
    );
  }
}
const localStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
