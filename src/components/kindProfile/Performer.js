import React, { Component } from "react";
import { StyleSheet, View, Text, Animated, Alert } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Welcome from "./forms/Welcome";
import PersonalInformation from "./forms/PersonalInformation";
import MusicalInformation from "./forms/MusicalInformation";
import ChurchInformation from "./forms/ChurchInformation";
import ContactInformation from "./forms/ContactInformation";
import MusicSelect from "./forms/MusicSelect";
import * as firebase from "firebase/app";
import Base64 from "Base64";
import { db } from "../firebase.js";
const screenWidth = Dimensions.get("window").width;

export default class Performer extends Component {
  scrollX = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.dataForm = this.dataForm.bind(this);
    this.setName = this.setName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setBirthDate = this.setBirthDate.bind(this);
    this.setMusicalInstrument = this.setMusicalInstrument.bind(this);
    this.setMusicianLicense = this.setMusicianLicense.bind(this);
    this.setTypeOfLicense = this.setTypeOfLicense.bind(this);
    this.setIpucSite = this.setIpucSite.bind(this);
    this.setAdministrativePastor = this.setAdministrativePastor.bind(this);
    this.setContactPhone = this.setContactPhone.bind(this);
    this.setAboutYou = this.setAboutYou.bind(this);

    this.setModal = this.setModal.bind(this);
    this.state = {
      data: [],
      disableNext:false,
      name: "",
      lastName: "",
      birthDate: "",
      musicalInstrument: [],
      musicianLicense: false,
      typeOfLicense: "",
      ipucSite: "",
      administrativePastor: "",
      contactPhone: "",
      aboutYou: "",
      indicator: "Siguiente",
      count: 0,
      pos: "20%",
      xPosition: new Animated.Value(-10 + (width * 30) / 100),
      size: new Animated.Value(1),
    };
  }
  animationXpos(w) {
    Animated.timing(this.state.xPosition, {
      toValue: w,
      duration: 200,
      useNativeDriver: true,
      modal: false,
    }).start();
  }
  //animation
  animationSize(s) {
    Animated.sequence([
      Animated.timing(this.state.size, {
        toValue: 0.5,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.size, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.size, {
        toValue: 0.8,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.size, {
        toValue: 1.2,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.size, {
        toValue: 0.7,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.size, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }
  dataForm(e) {
    this.setState({ data: e });
  }
  setName(e) {
    this.setState({ name: e });
  }
  setLastName(e) {
    this.setState({ lastName: e });
  }
  setBirthDate(e) {
    this.setState({ birthDate: e });
  }
  setMusicalInstrument(e) {
    this.setState({ musicalInstrumen: e });
  }
  setMusicianLicense(e) {
    this.setState({ musicianLicense: e });
  }
  setTypeOfLicense(e) {
    this.setState({ typeOfLicense: e });
  }
  setIpucSite(e) {
    this.setState({ ipucSite: e });
  }
  setAdministrativePastor(e) {
    this.setState({ administrativePastor: e });
  }
  setContactPhone(e) {
    this.setState({ contactPhone: e });
  }
  setAboutYou(e) {
    this.setState({ aboutYou: e });
  }
  async _scroll(count, data) {
    let porcent;
    console.log("condition1", count);
    try{
      let { name, lastName, birthDate } = data;
      let condition1 = name != "" && lastName != "" && birthDate != "";
      if (count == 0) {
        porcent = -10 + (width * 30) / 100;
        this.scroll.scrollTo({ x: 0 });
        this.setState({ pos: "0%" });
        this.animationXpos(porcent);
        this.animationSize(20);
  
      }
      if (count == 1) {
        porcent = -10 + (width * 40) / 100;
        this.scroll.scrollTo({ x: screenWidth });
        this.setState({ pos: "40%" });
        this.animationXpos(porcent);
        this.animationSize(20);
  
      }
    if (count == 2) {
        console.log("ver codificion")
        if (condition1) {
          porcent = -10 + (width * 50) / 100;
          this.scroll.scrollTo({ x: screenWidth * 2 });
          this.setState({ pos: "50%" });
          this.animationXpos(porcent);
          this.animationSize(20);
        } else {
          Alert.alert("Alto!", "Debe completar todos los datos para continuar");
          this.setState({count:1})
        } 
      }
      if (count == 3) {
        porcent = -10 + (width * 60) / 100;
        this.scroll.scrollTo({ x: screenWidth * 3 });
        this.setState({ pos: "60%" });
        this.animationXpos(porcent);
        this.animationSize(20);
      }
      if (count == 4) {
        porcent = -10 + (width * 70) / 100;
  
        this.scroll.scrollTo({ x: screenWidth * 4 });
        this.setState({ indicator: "Terminar" });
        this.setState({ pos: "70%" });
        this.animationXpos(porcent);
        this.animationSize(20);
      }
      if (count == 5) {
        console.log("terminar");
        this.setUser(data);
      }
    }catch(e){
      console.log("error incrment",e)
    }
/*   
  
  
    if (count == 4) {
      this.props.navigation.navigate("FinishProfile");
      this.handleNext();
    } */
  }
  
async increment(data) {
    if (this.state.count <= 5) {
      let next = await this.state.count+1;
      await this.setState({ count:next});
      this._scroll(next,data);
    }
  }
async decrement(data) {

    if (this.state.count >=0) {
      let back = await this.state.count-1;
      await this.setState({ count: back });
      console.log("back",back)
      this._scroll(back, data);

      //this.backScroll(back);
    }
  }
  setModal(e) {
    this.setState({ modal: e });
  }
  
  async setUser(data) {
    let currentUser = await firebase.auth().currentUser;
    let convertMd5 = await Base64.btoa(currentUser.email);
    await db.ref("/users/user" + convertMd5 + "/profile").set(data);
    this.props.navigation.navigate("FinishProfile");
    
  }
/*   handleNext() {
    this.setUser();
  } */
  render() {
    let instruments = typeof(this.props.navigation.state.params)=='undefined' ? false : this.props.navigation.state.params

    const data = {
      name: this.state.name,
      lastName: this.state.lastName,
      birthDate: this.state.birthDate,
      musicalInstrument: instruments.instruments,
      musicianLicense: this.state.musicianLicense,
      typeOfLicense: this.state.typeOfLicense,
      ipucSite: this.state.ipucSite,
      administrativePastor: this.state.administrativePastor,
      contactPhone: this.state.contactPhone,
      aboutYou: this.state.aboutYou,
    };
    //console.log("instruments",instruments)
    return (
      <View style={styles.container}>
        {this.state.modal && (
          <View style={styles.modal}>
            <MusicSelect setModal={this.setModal} />
          </View>
        )}

        <Text>{this.state.data[0]}</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewContainer}
          scrollEventThrottle={16}
          decelerationRate="fast"
          pagingEnabled
          scrollEnabled={true}
          ref={(re) => {
            this.scroll = re;
          }}
        >
          <View style={[styles.container, styles.items]}>
            <Welcome />
          </View>
          <View style={[styles.container, styles.items]}>
            <PersonalInformation
              setName={this.setName}
              setLastName={this.setLastName}
              setBirthDate={this.setBirthDate}
            />
          </View>
          <View style={[styles.container, styles.items]}>
            <MusicalInformation
              setModal={this.setModal}
              setMusicianLicense={this.setMusicianLicense}
              setTypeOfLicense={this.setTypeOfLicense}
              instruments={instruments}
            />
          </View>
          <View style={[styles.container, styles.items]}>
            <ChurchInformation
              setIpucSite={this.setIpucSite}
              setAdministrativePastor={this.setAdministrativePastor}
            />
          </View>
          <View style={[styles.container, styles.items]}>
            <ContactInformation
              setContactPhone={this.setContactPhone}
              setAboutYou={this.setAboutYou}
            />
          </View>
        </ScrollView>
        <View style={styles.indicatorContainer}>
          <Animated.View
            style={[
              styles.indicatorPoint,
              {
                transform: [
                  {
                    translateX: this.state.xPosition,
                  },
                  {
                    scaleX: this.state.size,
                  },
                  {
                    scaleY: this.state.size,
                  },
                ],
              },
            ]}
          ></Animated.View>
          <View style={styles.line}></View>
          <View
            style={[
              styles.point,
              {
                transform: [{ translateX: -10 + (width * 30) / 100 }],
              },
            ]}
          ></View>
          <View
            style={[
              styles.point,
              {
                transform: [{ translateX: -10 + (width * 40) / 100 }],
              },
            ]}
          ></View>
          <View
            style={[
              styles.point,
              {
                transform: [{ translateX: -10 + (width * 50) / 100 }],
              },
            ]}
          ></View>
          <View
            style={[
              styles.point,
              {
                transform: [{ translateX: -10 + (width * 60) / 100 }],
              },
            ]}
          ></View>
          <View
            style={[
              styles.point,
              {
                transform: [{ translateX: -10 + (width * 70) / 100 }],
              },
            ]}
          ></View>
          <View style={this.state.count >= 1? styles.next : styles.initialNext }>
          {this.state.count >= 1 && (
              <TouchableOpacity
              //style={{opacity:[this.state.disableNext ? 1 : 0.2]}}
              style={styles.btn_next}
              disabled={this.state.disableNext}
              onPress={() => {
                this.decrement(data);
              }}
            >
              <Text >Atras</Text>
            </TouchableOpacity>
            )

            }
            <TouchableOpacity
              //style={{opacity:[this.state.disableNext ? 1 : 0.2]}}
              style={styles.btn_next}
              disabled={this.state.disableNext}
              onPress={() => {
                this.increment(data);
              }}
            >
              <Text >{this.state.indicator}</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  items: {
    width,
    height,
  },
  initialNext:{
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btn_next:{
    height:32,
    padding:10,
    borderRadius:20,
    justifyContent:"center",
    backgroundColor:"#f3f3f3"
  },
  next:{
    width: "100%",
    justifyContent: "space-between",
    flexDirection:"row",
    paddingLeft:20,
    paddingRight:20,
  },
  indicatorContainer: {
    position: "absolute",
    width: "100%",
    height: 85,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: height - 50 }],
  },
  indicatorPoint: {
    width: 25,
    height: 25,
    top: 0,
    left: 0,
    backgroundColor: "#50e2c3ff",
    borderRadius: 20,
    position: "absolute",
    zIndex: 99,
  },
  point: {
    width: 20,
    height: 20,
    top: 2,
    left: 0,
    backgroundColor: "#E4E4E4",
    borderRadius: 20,
    position: "absolute",
  },
  ScrollViewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    position: "absolute",
    top: 10,
    width: "40%",
    height: 5,
    backgroundColor: "#E4E4E4",
  },
  modal: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    width,
    height,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
});
