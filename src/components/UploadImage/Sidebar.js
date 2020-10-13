import React, { Component } from "react";
import {
  StyleProvider,
  Grid,
  Col,
  Row,
  Container,
  Header,
  Button,
  ListItem,
  Spinner,
} from "native-base";
import UserContext from "../UserContext";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase/app";
import storage from "firebase/storage";
import { AppLoading } from "expo";

import { withGlobalContext } from "../UserContext";
import { StyleSheet, StatusBar, AsyncStorage, Image, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function ShowImg(props) {
  return (
    <View>
      {props.uri != null ? (
        <Image
          style={{ width: "100%", height: 300 }}
          source={{ uri: props.uri }}
        />
      ) : (
        <Image
          style={{ width: "100%", height: 300 }}
          source={require("./icon.jpg")}
        />
      )}
    </View>
  );
}

class Sidebar extends Component {
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
        .child("community/photo" + email + ".jpg")
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

  handleGetImages = (email) => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      quality: 0.2,
    })
      .then((result) => {
        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          this.setState({ urilink: uri });
          console.log(uri);
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
          .child("community/photo" + email + ".jpg")
          .getDownloadURL()
          .then((response) => {
            //console.log("url", response)
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
    const source = this.state.urilink;
    const email = this.props.global.account;
    const refreshAvatar = this.state.refreshAvatar;
    return (
      <View>
        <ShowImg uri={source} />

        <Button
          ref="photo"
          style={styles.imageSelect}
          transparent
          onPress={() => this.handleGetImages(email)}
        >
          <Icon
            style={{
              color: [this.props.global.color.color],
            }}
            size={40}
            name="pencil"
          />
        </Button>
      </View>
    );
  }
}
export default withGlobalContext(Sidebar);

const styles = StyleSheet.create({
  imageSelect: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    margin: 10,
    alignSelf: "flex-end",
  },
  avatar: {
    width: "100%",
    height: 300,
  },
});
