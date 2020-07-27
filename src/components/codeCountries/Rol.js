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
      codeCountry: "+ 123",
      colorSelect:"#888"
    };
  }

  handleChangeRol= (rol )=> {
    this.setState({colorSelect:"rgba(80,227,194,1)"})
    this.props.handlerRol(rol);
  };
  render() {
    let countries = RolJson;
    return (
      <View style={styles.container}>
      <Text style={{fontSize: 16, color:'#000' ,marginBottom:10}}>Destreza Musical</Text>
        
          <Picker
            placeholder="Selecciona tu Rol en la banda" 
            itemStyle={{ backgroundColor: '#fafafa', marginLeft: 0, paddingLeft: 30 }}
            style={{
              paddingLeft:0,
              marginLeft:0,
              fontSize: 16,
              color:"rgba(80,227,194,1)", 
            }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ codeCountry: itemValue });
              this.handleChangeRol(itemValue)
            }}
          >
            {countries.map((contry,index) => (
              (index !=0 ?(
                <Picker.Item
                label={contry.name}
                value={contry.name}
                
              />
              ):(
                <Picker.Item
                label="Selecciona tu destreza musical" value="Select"
              />
              ))
            ))}
          </Picker>        
      </View>
    );
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  formatPhoneNumber: {
    
    flexDirection: "row",
    alignItems: "center",
    width:'100%',

  },
  borderCode: {

  },
  borderPhone: {
   
  },

  itemStyle:{
    fontSize:16
  }
});
