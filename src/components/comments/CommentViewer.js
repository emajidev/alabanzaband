import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import * as firebase from "firebase/app";
import { db } from "../firebase.js";
import { withNavigation } from "react-navigation";
import { withGlobalContext } from "../UserContext";

let addComment = (id, user, text) => {
  let postSong = db.ref("/songs/" + id + "/comment");
  postSong
    .push({
      user: user,
      text: text,
    })
    .then((snapshot) => {
      //buzon de envio
      postSong.child(snapshot.key).update({ id: snapshot.key });
    });
};
class CommentViewer extends React.Component {
  state = {
    text: "",
    data: [],
    maxLength: 0,
  };

  textHandle = (e) => {
    let text = e.nativeEvent.text;
    this.setState({
      text: text,
      maxLength: text.length,
    });
  };

  async getComments() {
    try {
      const { props } = this.props.navigation.state.params;
      let ref = await db.ref("/songs/" + props.id + "/comment");
      ref.on("value", (snap) => {
        let data = snap.val();
        if (data != null) {
          let obj = Object.values(data);
          this.setState({ data: obj });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    this.getComments();
    console.log("color", this.props.global.color.theme);
  }
  handleSubmit = () => {
    let email = firebase.auth().currentUser.email;

    const { props } = this.props.navigation.state.params;
    if (this.state.maxLength > 0) {
      addComment(props.id, email, this.state.text);
      this.setState({ text: "" });
    }
  };

  render() {
    let maxLength = this.state.maxLength;
    const { props } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Comentarios</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item, index }) => (
            <View style={styles.comment}>
              {item != undefined ? (
                <View>
                  <Text>{item.user}</Text>
                  <Text>{item.text}</Text>
                </View>
              ) : (
                <Text>{index}</Text>
              )}
            </View>
          )}
        />
        <View style={styles.borderArea}>
          <TextInput
            value={this.state.text}
            style={styles.itemInputArea}
            multiline={true}
            numberOfLines={4}
            onChange={this.textHandle}
            maxLength={256}
            placeholder={"Escribe tu opinion sobre esta cancion..."}
          />

          <Text style={{ textAlign: "right" }}>{maxLength}/256</Text>
        </View>

        <TouchableOpacity
          style={
            this.state.maxLength > 0
              ? btn("rgba(80,227,194,1)").send
              : btn("#F2F2F2").send
          }
          onPress={() => this.handleSubmit()}
        >
          <Text
            style={
              this.state.maxLength > 0 ? styles.buttonText : styles.btnInactive
            }
          >
            Enviar
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
export default withGlobalContext(withNavigation(CommentViewer));
const btn = (props) =>
  StyleSheet.create({
    send: {
      backgroundColor: props,
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },
  });
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 10,
    fontSize: 20,
    textAlign: "center",
    color: "#D1D1D1",
  },
  maxLength: {
    justifyContent: "flex-end",
  },
  btnInactive: {
    color: "#D1D1D1",
  },
  comment: {
    marginLeft: 20,
    width: "90%",
    backgroundColor: "#F9F9F9",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  borderArea: {
    borderTopWidth: 5,
    borderColor: "#f9f9f9",
    padding: 5,

    backgroundColor: "#ECFFFA",
  },
  itemInputArea: {
    height: 50,
    fontSize: 16,
    justifyContent: "flex-start",
    color: "#8888",
    textAlignVertical: "top",
  },
});
