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
  Switch,
  Spinner,
} from "native-base";
import UserContext from "../UserContext";
import { withNavigation } from "react-navigation";

import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase/app";
import Base64 from "Base64";

import storage from "firebase/storage";
import { withGlobalContext } from "../UserContext";
import { AppLoading } from "expo";

import getTheme from "../../../native-base-theme/components";
import Options from "./Options";
import { StyleSheet, StatusBar, AsyncStorage, Image, View } from "react-native";
import Settings from "./Settings";
import { insert_In_avatarUri, select_avatarUri } from "../SqliteDateBase";

import CacheImage from "../cacheImage/CacheImage";
import { TouchableOpacity } from "react-native-gesture-handler";
class Sidebar extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      urilink: null,
      dataUser: [],
      source: null,
      refreshAvatar: false,
      uploadStatus: false,
    };
  }

  getStore = async () => {
    //console.log("store llamado");
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
  uploadToFirebase = (blob, email) => {
    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref();
      storageRef
        .child("uploads/photo" + email + ".jpg")
        .put(blob, {
          contentType: "image/jpeg",
        })
        .then((snapshot) => {
          blob.close();
          resolve(snapshot);
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
          return this.uriToBlob(uri);
        }
      })
      .then((blob) => {
        return this.uploadToFirebase(blob, email);
      })
      .then((snapshot) => {
        //console.log("File uploaded");
        firebase
          .storage()
          .ref()
          .child("uploads/photo" + email + ".jpg")
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
          .catch((error) => console.log("error", error));
      })
      .catch((error) => {
        throw error;
      });
  };

  componentDidMount() {
    this.getStore();
  }

  render() {
    const uri = this.state.urilink;
    const source = this.state.source;
    const uridefault = require("./icon.jpg");
    const { color, setColor } = this.context;
    const refreshAvatar = this.state.refreshAvatar;
    console.log("refre", this.state.refresh);
    return (
      <StyleProvider style={getTheme(color.theme)}>
        <Container
          style={{
            backgroundColor: "white",
          }}
        >
          <Header
            style={{
              height: 340,
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 0,
              elevation: 0,
            }}
          >
            <Content contentContainerStyle={{ flex: 1 }}>
              <Grid style={{ marginTop: StatusBar.currentHeight + 5 }}>
                <Row>
                  <Col
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    {refreshAvatar == false ? (
                      <View>
                        {this.state.uploadStatus == true ? (
                          <View
                            style={{
                              position: "absolute",
                              zIndex: 2,
                              width: 150,
                              height: 150,
                              borderRadius: 400,
                              backgroundColor: "#fff",
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 0.8,
                            }}
                          >
                            <Spinner color={this.props.global.color.color} />
                          </View>
                        ) : (
                          console.log("")
                        )}
                        <CacheImage uri={this.state.source} />
                      </View>
                    ) : (
                      console.log("refresh")
                    )}

                    <Button
                      ref="photo"
                      style={styles.imageSelect}
                      transparent
                      onPress={() => this.handleGetImages()}
                    >
                      <Icon
                        style={{
                          color: [this.props.global.color.color],
                          fontSize: 25,
                        }}
                        name="md-camera"
                      />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontWeight: "bold",
                          opacity: 0.3,
                          fontSize: 15,
                        }}
                      >
                        BIENVENIDO
                      </Text>
                      <Text
                        style={{
                          color: "#000",
                          fontWeight: "bold",
                          opacity: 0.3,
                          marginTop: 10,
                          fontSize: 14,
                        }}
                      >
                       asdas {this.state.dataUser.nick}
                      </Text>
                    </View>

                    <Button
                     
                      transparent
                      style={{
                        width: "90%",
                        padding: 10,
                        backgroundColor: "#f8f8f8",
                        marginTop: 5,
                        borderRadius:50,
                        justifyContent:"center"
                      }}
                      onPress={() => this.props.navigation.navigate("YourProfile")}
                    >
                    <Text style={{textAlign:"center"}}>Ver perfil</Text>   
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </Content>
          </Header>
          <Options />
        </Container>
      </StyleProvider>
    );
  }
}
export default withNavigation(withGlobalContext(Sidebar));

const styles = StyleSheet.create({
  imageSelect: {
    position: "absolute",
    bottom: -25,
    elevation: 5,
    padding: 0,
    width: 55,
    height: 55,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 300,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 400,
  },
});
