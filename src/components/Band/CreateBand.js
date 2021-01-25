import React, { Component } from 'react';
import { View, Text, TextInput, Image,TouchableOpacity,AsyncStorage,StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import CacheImage from "../cacheImage/CacheImage";
import Base64 from "Base64";
import * as ImagePicker from "expo-image-picker";

import * as firebase from "firebase/app";
import { db } from "../firebase";

export default class CreateBand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandName: "",
      review:"",
      storage:{},
      source:null,
      directorName: "",
      urilink: null,
      source: null,
      refreshAvatar: false,
      uploadStatus: false,
    };
  }
  componentDidMount(){
    this.getAsyncStorage()
  }
  async createBand(){
      const bandName  = this.state.bandName;
      const review    = this.state.review;
      const storage   = this.state.storage
      let currentUser = await firebase.auth().currentUser;
      let email = await Base64.btoa(currentUser.email);
      const ref = db.ref("/bands/");
      const yourBandRef = db.ref("/users/user"+email+"/yourBands")
      
      let snapshot = await ref
      .push({
        bandName,
        review,
        directorName : storage.name + storage.lastName,
        emailDirector: email
      })
      //buzon de envio
      let key  = await ref.child(snapshot.key).update({ id: snapshot.key });
      let blob = await this.uriToBlob(this.state.source);
      this.uploadToFirebase(blob,  snapshot.key )
      this.props.navigation.navigate("Main");

      let snapshotBands = await yourBandRef
      .set({
        idBand: snapshot.key ,
      })
           
  }
  async getAsyncStorage(){
    try {
      const data = await AsyncStorage.getItem('PROFILE_INFO')
      console.log("STORAGE DATA GET",data)

      let newData = JSON.parse(data);
      this.setState({storage:newData})
    }catch(e){
      console.log("error en obtener datos async storage",e)
    }
   }
  setBandName(text){
    this.setState({bandName:text})
  }
  setReview(text){
    this.setState({review:text})
  }
  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        // something went wrong
        reject(new Error("uriToBlob failed"));
      };
      // this helps us get a blob
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };
  uploadToFirebase = (blob, name) => {
    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref();
      storageRef
        .child("bands/" + name + ".jpg")
        .put(blob, {
          contentType: "image/jpeg",
        })
        .then((snapshot) => {
          blob.close();
          resolve(snapshot);
          console.log("snapshot",snapshot)
          this.setState({ uploadStatus: true });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  handleGetImages = async() => {
    let currentUser = await firebase.auth().currentUser;
    let email = await Base64.btoa(currentUser.email);

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      quality: 0.2,
    })
      .then((result) => {
        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          this.setState({ urilink: uri });
          console.log("ruta",uri)
          this.setState({ source: uri });

          //return this.uriToBlob(this.state.source);
        }
      })
      .then((blob) => {
        console.log("subir archivo")
        //return this.uploadToFirebase(blob, email);
      })
      .then((snapshot) => {
        //console.log("File uploaded");
        /* firebase
          .storage()
          .ref()
          .child("bands/photo" + email + ".jpg")
          .getDownloadURL()
          .then((response) => {
            //console.log("url", response)
            this.setState({ source: response });
             setTimeout(() => {
              this.setState({ refreshAvatar: true });
            }, 200);
            setTimeout(() => {
              this.setState({ refreshAvatar: false });
              this.setState({ uploadStatus: false });
            }, 200); 
          })
          .catch((error) => console.log("error", error)); */
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  render() {
    const image = this.state.source
    return (
      <View style={styles.container}>
        <View style={{height:350,width:"100%", backgroundColor: "#ebebeb",display:"flex",alignItems:"center"}}>
        {image && <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />}
          <TouchableOpacity
            ref="photo"
            style={styles.imageSelect}
            transparent
            onPress={() => this.handleGetImages()}
          >
            <Icon
              style={{
                color: "#5f25fe",
                fontSize: 25,
              }}
              name="camera"
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#ffff", fontSize: 16, fontWeight: "bold" }}>
            Crear banda
        </Text>
        <Text>Director</Text>
        <Text>{this.state.storage.name} {this.state.storage.lastName}</Text>
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setBandName(text)}
          value={this.state.bandName}
          editable
          fontSize={16}
          placeholder="Nombre de banda"
          placeholderTextColor="gray"
          maxLength={40}
        />
    <TextInput
          style={[styles.textInput,{height:200,borderRadius:5,textAlignVertical: 'top',padding:15}]}
          onChangeText={(text) => this.setReview(text)}
          value={this.state.review}
          editable
          fontSize={16}
          placeholder="Escribe una breve reseña sobre tu banda"
          placeholderTextColor="gray"
          maxLength={255}
          multiline={true}

        />
        <TouchableOpacity
          style={styles.btn_accept}
          onPress={()=>{this.createBand()}}
        >
          <Text style={{ color: "#ffff", fontSize: 16, fontWeight: "bold" }}>
            Crear banda
            </Text>
          <Icon
            name="chevron-circle-right"
            color="#fff"
            size={40}
            style={{ position: "absolute", right: 0, margin: 5 }}
          />
        </TouchableOpacity>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center"
  },
  textInput:{
    width:"90%",
    height:40,
    paddingLeft:20,
    backgroundColor:"#f5f5f5",
    marginTop:20,
    borderRadius:20
  },
  btn_accept: {
    backgroundColor: "#5f25fe",
    marginTop: 40,
    width: "80%",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  imageSelect: {
    position: "absolute",
    bottom: -25,
    elevation: 5,
    padding: 0,
    width: 55,
    height: 55,
    alignItems:"center",
    justifyContent: "center",
    borderRadius: 300,
    backgroundColor: "#fff",
  },
});
