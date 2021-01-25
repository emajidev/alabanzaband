import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import Instruments from "./instruments.json";
import { styles } from "../styles/StyleForm.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from "react-navigation";
let urls = [
  require("../icons/1.png"),
  require("../icons/2.png"),
  require("../icons/3.png"),
  require("../icons/4.png"),
  require("../icons/5.png"),
  require("../icons/6.png"),
  require("../icons/7.png"),
  require("../icons/8.png"),
  require("../icons/9.png"),
  require("../icons/10.png"),
  require("../icons/11.png"),
  require("../icons/12.png"),
  require("../icons/13.png"),
  require("../icons/14.png"),
  require("../icons/15.png"),
];
class Item extends Component {
  render() {
    const url = urls[this.props.data.id - 1];
    return (
      <View style={{ margin: 5 }}>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
          }}
          source={url}
        />
       {/*  <Text style={{ textAlign: "center", fontSize: 10 }}>
          {this.props.data.name}
        </Text> */}
      </View>
    );
  }
}
class MusicalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectLicence: false,
      typeOfLicense: "",
    };
  }
  setModal() {
    this.props.setModal(true);
  }
  setMusicianLicense(e) {
    this.setState({ selectLicence: e });
    this.props.setMusicianLicense(e);
  }
  setTypeOfLicense(e) {
    this.setState({ typeOfLicense: e });
    this.props.setTypeOfLicense(e);
  }
  renderItem(item) {
    return <Item data={item} />;
  }
  render() {
    const selectLicence = this.state.selectLicence;
    const instruments =
      typeof this.props.instruments.instruments == "undefined"
        ? []
        : this.props.instruments.instruments;
    //console.log("instr", instruments);
    return (
      <View style={styles.inputContent}>
        <Image
          style={{
            width: "80%",
            height: 320,
            marginBottom: 10,
          }}
          source={require("../img/music.jpg")}
        />
        {!instruments.length > 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.inputLabel}>Elije tus instrumentos</Text>
            <TouchableOpacity
              style={stylesBtn.select}
              onPress={() => {
                this.props.navigation.navigate("MusicSelect");
              }}
            >
              <Icon size={25} name="saxophone" />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={[stylesBtn.sectionEdit, { marginBottom: 10 }]}>
              <FlatList
                data={instruments}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item) => item.id}
                numColumns={7}
              />
            </View>
            <View style={{alignItems:"flex-end",paddingRight:5}}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.props.navigation.navigate("MusicSelect");
                }}
              >
                <Text>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={[styles.inputLabel,{marginTop:20}]}>¿ Posees licencia de Musico ?</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[selectLicence ? stylesBtn.unselect : stylesBtn.select]}
            onPress={() => this.setMusicianLicense(false)}
          >
            <Icon size={25} name="close" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[selectLicence ? stylesBtn.select : stylesBtn.unselect]}
            onPress={() => this.setMusicianLicense(true)}
          >
            <Icon size={25} name="check" />
          </TouchableOpacity>
        </View>
        {selectLicence && (
          <View style={{width:"100%",alignItems:"center"}}>
          <Text style={styles.inputLabel}>Tipo de licencia</Text>

          <TextInput
          style={stylesBtn.textInput}
          onChangeText={(typeOfLicense) => this.setTypeOfLicense(typeOfLicense)}
          value={this.state.typeOfLicense}
          editable
          maxLength={40}
          fontSize={16}
          placeholder="Apellido"
          placeholderTextColor="gray"
        />
          </View>
          
        )}
        
      </View>
    );
  }
}

export default withNavigation(MusicalInformation);
const stylesBtn = StyleSheet.create({
  unselect: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#e3e3e3",
    margin: 5,
  },
  select: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#50e2c3ff",
    margin: 5,
  },
  edit: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#50e2c3ff",
    margin: 5,
  },
  sectionEdit: {
    width: "100%",
    height: 60,
    marginBottom: 30,
    position: "relative",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  textInput: {
    width: "90%",
    height: 40,
    paddingLeft: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
    borderRadius: 20,
    color:"gray"

  },
});
