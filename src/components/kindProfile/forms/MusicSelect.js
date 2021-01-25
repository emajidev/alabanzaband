import React, { Component } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet,Image } from "react-native";
import { BackHandler } from 'react-native';

import Instruments from "./instruments.json";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
let urls = [
  require('../icons/1.png'),
  require('../icons/2.png'),
  require('../icons/3.png'),
  require('../icons/4.png'),
  require('../icons/5.png'),
  require('../icons/6.png'),
  require('../icons/7.png'),
  require('../icons/8.png'),
  require('../icons/9.png'),
  require('../icons/10.png'),
  require('../icons/11.png'),
  require('../icons/12.png'),
  require('../icons/13.png'),
  require('../icons/14.png'),
  require('../icons/15.png'),
]
let multiple_select = []
class Item extends Component {
  state={
    url:"",
    active:false
  }
  componentDidMount(){
    console.log(multiple_select,multiple_select.indexOf({name:this.props.data.name})) 
    if(multiple_select.indexOf(this.props.data) !=-1){
      this.setState({active:true})
    }else{
      this.setState({active:false})
    }
  }
  toggleHandle(){
    let active = this.state.active
    this.setState({active:!active})
    if(active){
      multiple_select.splice(multiple_select.indexOf(this.props.data.name),1)
      
    }else{
      multiple_select.push(this.props.data)
    }
    //console.log("instrumentos",multiple_select)
  }
  render() {
    const url = urls[this.props.data.id-1]
    const active = this.state.active
    return (
      <View style={styles.col}>
        <TouchableOpacity style={[styles.btnInstrument, active ? styles.active:styles.disable]}
          onPress={()=>{this.toggleHandle()}}
        >
         <View>
         <Image
          style={{
            width: 85,  
            height: 90,
          }}
          source={url}
        />
         </View>
       
         <Text style={{ textAlign: "center", fontSize:10 }}>{this.props.data.name}</Text>

        </TouchableOpacity>
      </View>
    );
  }
}

class MusicSelect extends Component {
  constructor(props) {
    super(props);
  }
  renderItem(item) {
    return <Item data={item}/>;
  }
  componentDidMount(){
 
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.grid}>
          <FlatList
            data={Instruments}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={(item) => item.id}
            numColumns={4}
          />
         
        </View>
        <TouchableOpacity
          style={{margin:50}}
          onPress={()=>{
            this.props.navigation.navigate("Performer",{instruments:multiple_select});
          }}
          >
            <Text>Aceptar</Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={{margin:20}}
          onPress={()=>{
            this.props.navigation.goBack();
          }}
          >
            <Icon name="chevron-circle-left" size={40} />
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
export default withNavigation(MusicSelect)
const styles = StyleSheet.create({
  container: {

    justifyContent: "flex-start",
    alignItems: "center",
    
  },
  active:{
    backgroundColor:"#4b4b"
  },
  disable:{
    backgroundColor: "#e5e5e5",
  },
  grid: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
  },
  col: {
    marginTop:20,
    width: windowWidth / 4,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  btnInstrument: {
    width: windowWidth / 4 - ((windowWidth / 4) * 10) / 100,
    height: (windowWidth / 4 - ((windowWidth / 4) * 10) / 100)+20,
    justifyContent: "center",
    alignItems: "center",
  },
});

