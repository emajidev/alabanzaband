import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Picker,
  TextInput
} from "react-native";
import JsonCountries from "./JsonCountries.json";

export default class CodeCountries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeCountry: "+ 123"
    };
  }

  handleChange = phone => {
    this.props.handler(phone);
  };
  render() {
    let countries = JsonCountries;
    return (
      <View style={styles.container}>
        <View style={styles.selectContry}>
          <Picker
            selectedValue={this.state.codeCountry}
            itemStyle={{ fontSize: 20, textAlign: "center" }}
            style={{
              height: 50,
              width: 150,
              fontSize: 20,
              transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
              textAlign: "flex-end"
            }}
            textStyle={{ fontSize: 20 }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ codeCountry: itemValue });
            }}
          >
            {countries.map(contry => (
              <Picker.Item
                itemStyle={styles.itemStyle}
                label={contry.emoji + "     " + contry.name}
                value={contry.dialCode}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.formatPhoneNumber}>
          <View style={styles.borderCode}>
            <Text style={{ fontSize: 20, color: "#d5d5d5" }}>
              {this.state.codeCountry}
            </Text>
          </View>
          <View style={styles.borderPhone}>
            <TextInput
              style={{ fontSize: 20, color: "#d5d5d5" }}
              placeholderTextColor="#d5d5d5"
              placeholder="Número de tel..."
              keyboardType="numeric"
              value={this.state.myNumber}
              maxLength={10} //setting limit of input
              onChangeText={phone => this.handleChange(phone)}
            />
          </View>
        </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 60
  },
  formatPhoneNumber: {
    flexDirection: "row",
    alignItems: "center",
    width:'100%',

  },
  borderCode: {
    width: 60,
    marginBottom: 30,
    borderBottomColor: "#d5d5d5",
    borderBottomWidth: 2
  },
  borderPhone: {
    marginLeft: 10,
    marginBottom: 30,
    borderBottomColor: "#d5d5d5",
    borderBottomWidth: 2
  },
  selectContry: {
    width:'100%',
    height:50,
    marginLeft: 10,
    marginBottom: 30,
    borderBottomColor: "#d5d5d5",
    borderBottomWidth: 2,
    alignItems: "center",
  },

});
