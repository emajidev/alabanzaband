import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  inputContent: {
    width,
    height,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 0,
  },
  inputLabel: {
    color: "#808080",
    fontSize: 20,
  },
  inputText: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 50,
    width: "100%",
    padding: 10,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    color: "#888888",
  },

});
export { styles };
