import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
class PublishContent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    color: "",
    title: "",
  };
  componentDidMount() {
    this.generateColor();
  }
  generateColor() {
    let simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";

    for (let i = 0; i < 6; i++) {
      color = color + simbolos[Math.floor(Math.random() * 16)];
      this.setState({ color: color });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChange={(text) => this.setState({ title: text })}
          value={this.state.title}
          placeholder="Escribe una actividad"
          placeholderTextColor="white"
          multiline={true}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          style={{
            backgroundColor: [this.state.color],
            width: "100%",
            height: "100%",
          }}
          onPress={() => this.generateColor()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    position: "absolute",
    textAlign: "center",
    fontSize: 30,
    zIndex: 99,
    color: "white",
  },
});

export default PublishContent;
