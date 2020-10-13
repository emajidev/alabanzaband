import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AppRegistry, Switch } from "react-native";

import {
  Container,
  InputGroup,
  Footer,
  Header,
  Input,
  Button,
  Content,
  CheckBox,
  Title,
  Picker,
  Icon,
  List,
  CardItem,
  Thumbnail,
  Badge,
  StyleProvider,
  Card,
  Left,
  Right,
  Body,
} from "native-base";

import getTheme from "../../../native-base-theme/components";
import { withGlobalContext } from "../UserContext";

class CardComponent extends Component {
  render() {
    return (
      <Card style={{ elevation: 2, borderColor: "#fff" }}>
        <CardItem
          style={{
            paddingRight: 10,
            paddingLeft: 20,
          }}
        >
          <Thumbnail
            source={{
              uri: "https://reactjs.org/logo-og.png",
            }}
          />
          <Text>NativeBase</Text>
          <Text>April 15, 2016</Text>
        </CardItem>

        <CardItem
          cardBody
          style={{
            paddingRight: 0,
            paddingLeft: 0,
            flexDirection: "column",
          }}
        >
          <View style={styles.container}>
            <Image
              style={{ with: 200, height: 200 }}
              source={{
                uri: "https://reactjs.org/logo-og.png",
              }}
            />
            <Text>//Your text here</Text>
            <Button transparent textStyle={{ color: "#87838B" }}>
              <Text> 389 Stars</Text>
            </Button>
          </View>
        </CardItem>
      </Card>
    );
  }
}
class ShowCommunity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyleProvider style={getTheme(this.props.global.color.theme)}>
        <Container>
          <Content>
            <FlatList
              data={["1", "2", "3"]}
              renderItem={({ item }) => <CardComponent />}
              keyExtractor={(item) => item}
            />
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  CardItem: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "powderblue",
  },
});

export default withGlobalContext(ShowCommunity);
