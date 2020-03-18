import React, { Component } from "react";
import {
  StyleProvider,
  Grid,
  Col,
  Row,
  TabHeading,
  Container,
  Header,
  Thumbnail,
  Tab,
  Tabs,
  ScrollableTab,
  Text,
  Content,
  Button,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Switch
} from "native-base";
import UserContext from "../UserContext";
import * as ImagePicker from "expo-image-picker";
import * as firebase from 'firebase/app';
import 'firebase/storage';

import getTheme from "../../../native-base-theme/components";
import turquesa from "../../../native-base-theme/variables/turquesa";
import Options from "./Options";
import { StyleSheet, StatusBar, AsyncStorage } from "react-native";
import Settings from "./Settings";
export default class Sidebar extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      urilink: null,
      dataUser: []
    };
  }
 
  getStore = async () => {
    console.log("store llamado");
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // We have data!!
        this.setState({ dataUser: JSON.parse(value) });
      } else {
        console.log("nullstore");
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        // something went wrong
        reject(new Error("uriToBlob failed"));
      };
      // this helps us get a blob
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };
  uploadToFirebase =(blob,phone) => {
    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref();
      storageRef
        .child("uploads/photo"+phone.toString()+".jpg")
        .put(blob, {
          contentType: "image/jpeg"
        })
        .then(snapshot => {
          blob.close();
          resolve(snapshot);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  
  handleGetImages= (phone) => { 

    ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: "Images"
    }).then((result)=>{ 

      if (!result.cancelled) {
        // User picked an image
        const {height, width, type, uri} = result;
        this.setState({ urilink: uri });
        return this.uriToBlob(uri);

      }

    }).then((blob)=>{

      return this.uploadToFirebase(blob,phone);

    }).then((snapshot)=>{

      console.log("File uploaded");
   
    }).catch((error)=>{

      throw error;

    }); 

  }

  componentDidMount() {
    this.getStore();
  }

  render() {
    const uri = this.state.urilink;
    const phone = this.state.dataUser.phone
    const uridefault = require("./icon.jpg");
    const { user, setUser } = this.context;
    console.log("datos phone", uri);
    return (
      <StyleProvider style={getTheme(user.theme)}>
        <Container>
          <Header style={{ backgroundColor: "#50e2c3ff", height: 300 }}>
            <Content contentContainerStyle={{ flex: 1 }}>
              <Grid style={{ marginTop: StatusBar.currentHeight + 15 }}>
                <Row>
                  <Col
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    {uri != null ? (
                      <Thumbnail
                        style={{ width: 150, height: 150, borderRadius: 400 }}
                        source={{ uri }}
                      />
                    ) : (
                      <Thumbnail
                        style={{ width: 150, height: 150, borderRadius: 400 }}
                        source={require("./icon.jpg")}
                      />
                    )}

                    <Button
                      ref="photo"
                      style={styles.imageSelect}
                      transparent
                      onPress={() => this.handleGetImages(phone)}
                    >
                      <Icon
                        style={{ color: "#50e2c3ff", fontSize: 25 }}
                        name="md-camera"
                      />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text
                      style={{ color: "#fff", marginTop: 30, fontSize: 15 }}
                    >
                      BIENVENIDO
                    </Text>
                    <Text style={{ color: "#fff", marginTop: 5, fontSize: 14 }}>
                      {this.state.dataUser.nick}
                    </Text>
                    <Text style={{ color: "#fff", marginTop: 5, fontSize: 12 }}>
                      telefono: {phone}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </Content>
          </Header>

          <Tabs>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-options" />
                  <Text>Opciones</Text>
                </TabHeading>
              }
            >
              <Options />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-settings" />
                  <Text>Ajustes</Text>
                </TabHeading>
              }
            >
              <Settings />
            </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}
const styles = StyleSheet.create({
  imageSelect: {
    position: "absolute",
    top: 150 - 55,
    elevation: 5,
    padding: 0,
    width: 55,
    height: 55,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 300,
    backgroundColor: "#fff"
  }
});
