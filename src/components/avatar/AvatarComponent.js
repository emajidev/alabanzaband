import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import Base64 from "Base64";
import * as firebase from "firebase/app";
import UserAvatar from "react-native-user-avatar";

export default class AvatarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: "",
      showUserName: true,
      showUser: true,
      showPhone: false,
    };
  }
  componentDidMount() {
    this.avatar();
  }

  avatar() {
    let email = Base64.btoa(this.props.email);

    firebase
      .storage()
      .ref()
      .child("uploads/photo" + email + ".jpg")
      .getDownloadURL()
      .then((url) => {
        this.setState({ uri: url });
        console.log("avatar",uri)
      })
      .catch((e) => {
        console.log("no hay foto de perfil");
      });
  }
  showUserName() {
    const show = this.props.showUserName;

    if (show) {
      return <Text style={styles.textColor}> {this.props.email} </Text>;
    }
  }
  showUser() {
    const show = this.props.showUser;

    if (show) {
      return <Text style={styles.textColor}> {this.props.name} </Text>;
    }
  }
  showPhone() {
    const show = this.props.showPhone;

    if (show) {
      return <Text style={styles.textColor}> {this.props.phone} </Text>;
    }
  }
  render() {
    const email = this.props.email;
    return (
      <View style={this.props.onlyImg == true ? styles.img : styles.container}>
        <View style={{ marginRight: 5 }}>
          {this.state.uri ? (
            <Image
              style={styles.photoAvatar}
              source={{
                uri: this.state.uri,
              }}
            />
          ) : (
            <UserAvatar size={40} name={email} />
          )}
        </View>

        <View>
          {this.showUserName()}
          {this.showUser()}
          {this.showPhone()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "#f1f1f1",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  img: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoAvatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  textColor: {
    color: "#A2A2A2",
  },
});

