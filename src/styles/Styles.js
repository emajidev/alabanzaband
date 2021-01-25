import { StyleSheet, AsyncStorage, StatusBar } from "react-native";
import React from "react";
export default class StylesApp extends React.Component {
  state = {
    colorTheme: "#39f6",
  };
  async componentDidMount() {
    await this.getData();
  }
  getData = async () => {
    try {
      const data = await AsyncStorage.getItem("@storage_Key");
      let newData = JSON.parse(data);

      this.setState({ colorTheme: newData.colorTheme });
      console.log(" color", dataStorage);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"transparent"
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
    backgroundColor: "rgba(80,227,194,1)",

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
const navbarStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "#f43",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn_nav: {
    margin: 8,
  },

  iconMenu: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  iconnavbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 5,
    backgroundColor: "#fff",
  },

  title: {
    color: "#777",
    fontSize: 20,
  },
});
export { styles, navbarStyles };
