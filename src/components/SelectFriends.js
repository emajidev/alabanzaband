import React from "react";
import {
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { withNavigation } from "react-navigation";
import { withGlobalContext } from "./UserContext";
import AvatarComponent from "./avatar/AvatarComponent";
import Base64 from "Base64";
import {
  Container,
  Content,
  Card,
  Tabs,
  Tab,
  TabHeading,
  CardItem,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Badge,
  FooterTab,
  Footer,
  StyleProvider,
  Drawer,
} from "native-base";
import { db } from "./firebase.js";
import * as firebase from "firebase/app";
class Option extends React.Component {
  state = {
    selectThis: false,
  };
  render() {
    const { name, email } = this.props;

    /* console.log("select =>", this.state.selectThis) */
    return (
      <Button
        onPress={() => {
          this.props.onPress();
          this.setState({ selectThis: !this.state.selectThis });
        }}
        style={this.state.selectThis == true ? styles.select : styles.unselect}
      >
        <Content>
          <AvatarComponent email={email} name={name} showUserName={true} />
        </Content>
      </Button>
    );
  }
}
class SelectFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: [],
      items: [],
    };

    this.isSelected = this.isSelected.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  toggleStyles(el, index) {
    const { selected } = this.state;
    /*console.log("sleccion", selected)*/
    return selected.indexOf(index) !== -1;
  }

  isSelected(i) {
    let { selected } = this.state;
    if (selected.indexOf(i) === -1) {
      selected.push(i);
    } else {
      selected = selected.filter((index) => index !== i);
    }
    this.setState({ selected });
  }
  getData = async () => {
    try {
      let account = firebase.auth().currentUser.email;
      account = Base64.btoa(account);

      console.log("cuenta2", account);
      let itemsRef = db.ref("/users/user" + account + "/contacts");
      itemsRef.on("value", (snapshot) => {
        let data = snapshot.val();
        let items = Object.values(data);
        console.log("contactos", items);
        this.setState({ items });
      });
    } catch (e) {
      // error reading value
      console.log("error en list constactos", e);
    }
  };

  async componentDidMount() {
    this.getData();
  }
  setModalVisible(e) {
    this.props.setModalVisible(e);
  }
  setFriends(list) {
    console.log("list amigos", list);
    this.props.global.setFriends(list);
    if (list.length > 0) {
      this.setModalVisible(false);
    }
  }
  showAvatar() {
    if (this.state.selected.length > 0) {
      return (
        <View
          style={{
            flexDirection: "row",
            height: 50,
            marginTop: 20,
            margin: 10,
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.selected}
            enableEmptySections={true}
            renderItem={({ item, index }) => (
              <View>
                <AvatarComponent email={item} onlyImg={true} />
              </View>
            )}
          />
        </View>
      );
    }
  }
  render() {
    /*   console.log(this.state.items) */

    return (
      <View style={{ flex: 1, justifyContent: "flex-start", width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 40,
            alignItems: "center",
          }}
        >
          <View style={{ justifyContent: "center", width: "80%" }}>
            <Text style={{ color: "#50e2c3ff", fontSize: 20, marginLeft: 15 }}>
              Selecciona tus amigos
            </Text>
          </View>
          <View style={{ justifyContent: "center", width: "20%" }}>
            <Button
              trasnparent
              style={{ backgroundColor: "#fff", elevation: 0 }}
              onPress={() => this.setFriends(this.state.selected)}
            >
              <Icon
                style={{ color: "#50e2c3ff", fontSize: 40 }}
                name="md-checkmark"
              />
            </Button>
          </View>
        </View>

        {this.showAvatar()}
        <View style={{ flex: 1 }}>
          {this.state.items.map((item, index) => (
            <Option
              name={item.name}
              email={item.userName}
              key={index}
              onPress={() => this.isSelected(item.userName)}
              selected={this.toggleStyles(item.email)}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default withGlobalContext(SelectFriends);

const styles = StyleSheet.create({
  itemtext: { fontSize: 20, marginLeft: 5 },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: "center",
  },
  textContact: { fontSize: 15 },

  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: StatusBar.currentHeight + 15,
  },

  buttonText: {
    fontSize: 18,
    color: "#000",
  },

  select: {
    width: "100%",
    height: 60,
    margin: 10,
    backgroundColor: "#b8ffc1",
    flexDirection: "row",
    elevation: 0,
    padding: 10,
    borderRadius: 10,
  },
  selectPhone: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  unselect: {
    backgroundColor: "#fff",
    width: "100%",
    height: 60,
    margin: 10,
    flexDirection: "row",
    elevation: 0,
    padding: 10,
    borderRadius: 10,
  },
});
