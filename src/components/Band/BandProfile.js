import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import * as firebase from "firebase/app";
import { db } from "../firebase";
import {
  Container,
  Body,
  Button,
  Card,
  CardItem,
  Right,
  Left,
  Icon,
  Thumbnail,
} from "native-base";

export default class BandProfile extends Component {
  data = this.props.navigation.state.params.item;
  join = this.props.navigation.state.params.join;
  constructor(props) {
    super(props);
    this.state = {
      uri: "",
      uriDirector:"",
      text: "",
      id_member: "",
      fadeAnim: new Animated.Value(0),
    };
  }
  componentDidMount() {
    this.poster();
    this.imgDirector();
    let resp = this.join_members();
    console.log("resp", resp);
    if (!resp) {
      this.setState({ text: "Dejar de Seguir" });
    } else {
      this.setState({ text: "Seguir" });
    }
  }
  fadeIn(delay) {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }
  JoinBand() {
    const email = firebase.auth().currentUser.email;
    const ref = db.ref("/bands/" + this.data.id + "/members/");
    let resp = this.join_members();
    if (resp) {
      ref.push({ email }).then((snapshot) => {
        ref.child(snapshot.key).update({ id: snapshot.key });
        this.setState({ id_member: snapshot.key });
      });
    } else {
      let id_member = this.state.id_member;
      let ref_delete = db.ref(
        "/bands/" + this.data.id + "/members/" + id_member
      );
      ref_delete.set(null);
    }
  }
  join_members() {
    const email = firebase.auth().currentUser.email;
    const ref = db.ref("/bands/" + this.data.id + "/members/");

    let exist;
    //QUERY
    ref
      .orderByChild("email")
      .equalTo(email)
      .on("value", function (snapshot) {
        console.log("query", snapshot.val());
        let data = snapshot.val();
        if (data != null) {
          exist = true;
        } else {
          exist = false;
        }
      });

    //JOIN
    if (!exist) {
      this.setState({ text: "Dejar de seguir" });
      return true;
      ref.push({ email }).then((snapshot) => {
        //buzon de envio
        ref.child(snapshot.key).update({ id: snapshot.key });
        this.setState({ id_member: snapshot.key });
      });
    } else {
      this.setState({ text: "Seguir" });
      return false;

      let id_member = this.state.id_member;
      let ref_delete = db.ref(
        "/bands/" + this.data.id + "/members/" + id_member
      );
      ref_delete.set(null);
      console.log("id_member", this.state.id_member);
    }
  }
  poster() {
    let idBand = this.data.id;
    firebase
      .storage()
      .ref()
      .child("bands/" + idBand + ".jpg")
      .getDownloadURL()
      .then((url) => {
        this.setState({ uri: url });
        console.log("avatar", url);
      })
      .catch((e) => {
        console.log("no hay foto de perfil");
      });
  }
  imgDirector() {
    let email_director = this.data.emailDirector;

    firebase
      .storage()
      .ref()
      .child("uploads/photo" + email_director + ".jpg")
      .getDownloadURL()
      .then((url) => {
        this.setState({ uriDirector: url });
        console.log("avatar", url);
      })
      .catch((e) => {
        console.log("no hay foto de perfil");
      });
  }

  render() {
    return (
      <Container>
        <Card style={styles.format}>
          <CardItem>
            <Left>
              {/* <Thumbnail source={{uri:this.state.uri}} /> */}
              <Body>
                <Text> {this.data.bandName} </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Animated.Image
              onLoad={this.fadeIn(100)}
              source={{ uri: this.state.uri }}
              style={[
                {
                  height: 400,
                  flex: 1,
                  opacity: this.state.fadeAnim,
                  backgroundColor: "#a8a8a8",
                },
              ]}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <View>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </View>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <View>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </View>
              </Button>
            </Body>
            <Right>
              {this.join && (
                <Button
                  style={{
                    width: 130,
                    display: "flex",
                    justifyContent: "center",
                  }}
                  bordered
                  info
                  onPress={() => {
                    this.JoinBand();
                  }}
                >
                  <Text style={{ color: "#0080FF" }}> {this.state.text} </Text>
                </Button>
              )}
            </Right>
          </CardItem>
          <CardItem footer bordered>
            <Left>
              <Animated.View
                onLoad={this.fadeIn(800)}
                style={[
                  {
                    opacity: this.state.fadeAnim,
                    backgroundColor: "#ebebeb",
                  },
                ]}
              >
                <Thumbnail small source={{ uri: this.state.uriDirector }} />
              </Animated.View>
              <Body>
                <Text>Director:</Text>
                <Text>{this.data.directorName} </Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Card style={styles.format}>
          <CardItem header>
            <Text>Reseña</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{this.data.review}</Text>
            </Body>
          </CardItem>
        </Card>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TopBar: {
    width: "100%",
  },
  format: {
    elevation: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: 0,
  },
});
