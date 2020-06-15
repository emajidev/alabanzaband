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
      <Text style={{fontSize:16,marginLeft:15,marginBottom:15,color:"#555"}}>Destreza Musical</Text>
        <View style={styles.selectRol}>
        
          <Picker
            placeholder="Selecciona tu Rol en la banda" 
            selectedValue={this.state.codeCountry}
            itemStyle={{ fontSize: 15, textAlign: "center"}}
            style={{
              height: 50,
              width: '85%',
              fontSize: 14,
              transform: [{ scaleX: 1.22 }, { scaleY: 1.2 }],
              textAlign: "flex-end",
              color:"rgba(80,227,194,1)", 
            }}
            textStyle={{ fontSize: 15 ,}}
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
                label="Selecciona tu destreza musical" value="Select"
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
  selectRol: {
    
    height:50,
    marginLeft:15,
    marginBottom: 30,
    borderBottomColor: "rgba(80,227,194,1)",
    borderBottomWidth: 1,

    alignItems: "center",
  },

});
