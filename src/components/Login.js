import React from "react";
import {
  StyleSheet,
  AsyncStorage,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase/app";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
      iconChange: "eye",
    };
  }
  state = { email: "", password: "", errorMessage: null };
  getData = async () => {
    try {
      const data = await AsyncStorage.getItem("@storage_Key");
      let newData = JSON.parse(data);
      if (newData.phone !== null) {
        this.props.navigation.dismiss();
      }
    } catch (e) {
      // error reading value
      console.log("error en list constactos", e);
    }
  };
  componentDidMount() {
    this.getData();
  }
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("FormProfile"))
      .catch((error) => this.setState({ errorMessage: error.message }));
    console.log("handleLogin");
  };
  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  handleLoginFacebook = () => {
    const cred = firebase.auth.FacebookAuthProvider.credential(
      facebookIdToken,
      facebookAccessToken
    );
    firebase
      .auth()
      .signInWithCredential(cred)
      .then((result) => {
        // User signed in.
        var token = result.credential.accessToken;
        console.log("token", token);
      })
      .catch((error) => {
        // Error occurred.
      });
  };
  emailHandle(email) {
    this.setState({
      email: email.replace(/\s/g, ""),
    });
  }
  passwordHandle(password) {
    this.setState({
      password: password.replace(/\s/g, ""),
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text
            style={{
              color: "#4b5b68",
              fontSize: 25,
              fontStyle: "italic",
              letterSpacing: 5,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Ingresar
          </Text>
          {this.state.errorMessage && (
            <Text style={{ color: "red", marginBottom: 20 }}>
              datos invalidos{/*  {this.state.errorMessage} */}
            </Text>
          )}
          <View style={styles.borderBox}>
            <View style={styles.TextInput}>
              <Icon color="#d9e3dd" name="user" size={25} />
              <TextInput
                autoCapitalize="none"
                placeholder="Correo electrónico"
                onChangeText={(email) => this.emailHandle(email)}
                value={this.state.email}
                style={{ color: "#808080", fontSize: 18, paddingLeft: 5 }}
              />
            </View>
            <View
              style={{
                width: "90%",
                height: 1,
                backgroundColor: "#hsl(144, 15%, 87%)",
              }}
            />

            <View style={styles.TextInput}>
              <Icon color="#d9e3dd" name="lock" size={25} />
              <TextInput
                secureTextEntry={this.state.showPassword}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={(password) => this.passwordHandle(password)}
                value={this.state.password}
                style={{
                  color: "#808080",
                  width: "90%",
                  fontSize: 18,
                  paddingLeft: 5,
                }}
              />
              <TouchableOpacity
                onPress={this.toggleSwitch}
                value={!this.state.showPassword}
              >
                <Icon
                  name={this.state.showPassword ? "eye-slash" : "eye"}
                  style={{ color: "#ddd" }}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.btn_accept}
            onPress={this.handleLogin}
          >
            <Text style={{ color: "#ffff", fontSize: 16, fontWeight: "bold" }}>
              Iniciar sesión
            </Text>
            <Icon
              name="chevron-circle-right"
              color="#fff"
              size={40}
              style={{ position: "absolute", right: 0, margin: 5 }}
            />
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
                <Text style={{ color: "#808080", fontSize: 16, marginTop: 15 }}>
                  ¿No tienes una cuenta?, toca aqui para{" "}
                  <Text style={{ color: "#5f25fe" }}>crear una...</Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 30 }}
              onPress={() => this.props.navigation.navigate("RecoverPassword")}
            >
              <Text style={{ color: "#808080" }}>
                ¿ Olvidaste tu contraseña ?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ marginTop: 50 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="chevron-circle-left" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 6,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TextInput: {
    flexDirection: "row",

    marginTop: 20,
    marginBottom: 20,
    width: "80%",
  },
  bg: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 50,
    marginBottom: 100,
  },
  mg: {
    marginTop: 2,
  },

  borderBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  btn_sesion: {
    backgroundColor: "#10cb42",
    marginTop: 40,
    width: "80%",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  btn_facebook: {
    backgroundColor: "#235e86",
    marginTop: 40,
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btn_accept: {
    backgroundColor: "#5f25fe",
    marginTop: 40,
    width: "80%",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  btn_primary_light: {
    borderColor: "#5f25fe",
    borderWidth: 2,
    borderRadius: 50,
    marginTop: 40,
    width: "80%",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
