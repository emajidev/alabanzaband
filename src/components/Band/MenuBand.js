import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "react-navigation";

const colorTheme = "#50e2c3ff"
class MenuBand extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: 350,
            height: 400,
          }}
          source={require("../../img/micro.png")}
        />
        <TouchableOpacity
          style={[styles.btn_accept,{backgroundColor:colorTheme}]}
          onPress={() => this.props.navigation.navigate("CreateBand")}
        >
          <Text style={{ color: "#ffff", fontSize: 16, fontWeight: "bold" }}>
            Crear banda
          </Text>
          <Icon
            name="chevron-circle-right"
            color="#fff"
            size={40}
            style={{ position: "absolute", right: 0, margin: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn_secundary,{borderColor:colorTheme}]}
          onPress={() => this.props.navigation.navigate("JoinBand")}
        >
          <Text style={{ color: colorTheme, fontSize: 16, fontWeight: "bold" }}>
            Unirte a banda
          </Text>
          <Icon
            name="chevron-circle-right"
            color={colorTheme} 
            size={40}
            style={{ position: "absolute", right: 0, margin: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(MenuBand)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  btn_accept: {
    marginTop: 40,
    width: 250,
    height: 50,
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  btn_secundary: {
    borderWidth:3,
    marginTop: 40,
    width: 250,
    height: 50,
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
