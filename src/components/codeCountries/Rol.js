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
import RolJson from "./RolJson.json";

export default class Rol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeCountry: "+ 123"
    };
  }

  handleChangeRol= (rol )=> {
    this.props.handlerRol(rol);
  };
  render() {
    let countries = RolJson;
    return (
      <View style={styles.container}>
        <View style={styles.selectContry}>
          <Picker
            placeholder="Selecciona tu Rol en la banda" 
            selectedValue={this.state.codeCountry}
            itemStyle={{ fontSize: 20, textAlign: "center" }}
            style={{
              height: 50,
              width: '85%',
              
              fontSize: 20,
              transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
              textAlign: "flex-end"
            }}
            textStyle={{ fontSize: 20 }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ codeCountry: itemValue });
              this.handleChangeRol(itemValue)
            }}
          >
            {countries.map((contry,index) => (
              (index !=0 ?(
                <Picker.Item
                itemStyle={styles.itemStyle}
                label={contry.name}
                value={contry.name}
              />
              ):(
                <Picker.Item
                itemStyle={styles.itemStyle}
                label="Selecciona tu Rol en la banda" value="Select"
              />
              ))
             
             
            ))}
          </Picker>
        </View>
        
      </View>
    );
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  formatPhoneNumber: {
    
    flexDirection: "row",
    alignItems: "center",
    width:'100%',

  },
  borderCode: {
    width:100,
    paddingLeft:20,
    marginBottom: 30,
    borderBottomColor: "rgba(80,227,194,1)",
    borderBottomWidth: 1
  },
  borderPhone: {
    width:'100%',
    marginLeft: 10,
    marginBottom: 30,
    borderBottomColor: "rgba(80,227,194,1)",
    borderBottomWidth: 1
  },
  selectContry: {
    
    height:50,
    paddingLeft:10,
    marginBottom: 30,
    borderBottomColor: "rgba(80,227,194,1)",
    borderBottomWidth: 1,

    alignItems: "center",
  },

});
