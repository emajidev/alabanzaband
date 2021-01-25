import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";

import { styles } from "../styles/StyleForm.js";
import { TouchableOpacity } from "react-native-gesture-handler";

class FinishProfile extends Component {
  componentDidMount(){
    setTimeout(()=>{
      this.props.navigation.navigate("Main");
    },2000)
  }

  render() {
    return (
      <View style={styles.inputContent}>
  
        <Image
          style={{
            width: "100%",
            height: 320,
          }}
          source={require("../img/2941990.jpg")}
        />
      </View>
    );
  }
}

export default FinishProfile;
