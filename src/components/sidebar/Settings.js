import React, { Component } from "react";
import {
  StyleProvider,
  Container,
  Grid,
  Col,
  Row,
  Header,
  Button,
  Content,
  Badge,
  Text,
  Icon,
  List,
  ListItem,
  Right,
  Left,
  Body,
} from "native-base";
import { clearThemeCache } from "native-base-shoutem-theme";

import Icon2 from "react-native-vector-icons/FontAwesome";
import UserContext from "../UserContext";

import getTheme from "../../../native-base-theme/components";
import themeA from "../../../native-base-theme/variables/themeA";
import themeB from "../../../native-base-theme/variables/themeB";
import themeC from "../../../native-base-theme/variables/themeC";
import themeD from "../../../native-base-theme/variables/themeD";
import themeE from "../../../native-base-theme/variables/themeE";
import themeF from "../../../native-base-theme/variables/themeF";
import themeG from "../../../native-base-theme/variables/themeG";
import themeH from "../../../native-base-theme/variables/themeH";
import themeI from "../../../native-base-theme/variables/themeI";

import { withGlobalContext } from "../UserContext";
class Settings extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      theme: "",
    };
  }
  theme(setColor, colorTheme, name, color, theme) {
    clearThemeCache();
    this.setState({
      theme: theme,
    });
    const newUser = {
      name: name,
      loggedIn: true,
      theme: theme,
      color: colorTheme,
    };
    setColor(newUser);
    //console.log("el tema elegido es ", color)
  }

  componentDidMount() {
    const color = this.context;
  }
  render() {
    const { color, setColor } = this.context;
    console.log(color.theme);
    return (
      <StyleProvider style={getTheme(color.theme)}>
        <Container>
          <Content>
            <ListItem noBorder>
              <Text>Actualizaciones</Text>
            </ListItem>
            <ListItem noBorder>
              <Text>Descargas en segundo plano</Text>
            </ListItem>
            <ListItem noBorder>
              <Text>Alertas</Text>
            </ListItem>
            <ListItem noBorder>
              <Text>Notificaciones</Text>
            </ListItem>

            <ListItem noBorder>
              <Text>Tema</Text>
            </ListItem>
            <ListItem icon noBorder style={{ marginTop: 20 }}>
              <Body>
                <Text>Tema seleccionado</Text>
              </Body>
              <Right>
                <Icon2 name="circle" size={30} color={color.color} />
              </Right>
            </ListItem>
            <ListItem noBorder>
              <Grid padder>
                <Row>
                  <Col>
                    <Button
                      vertical
                      transparent
                      onPress={() =>
                        this.theme(
                          setColor,
                          "rgba(80,227,194,1)",
                          "themeA",
                          color,
                          themeA
                        )
                      }
                    >
                      <Icon2
                        name="circle"
                        size={30}
                        color="rgba(80,227,194,1)"
                      />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      vertical
                      transparent
                      onPress={() =>
                        this.theme(setColor, "#ff9494", "themeB", color, themeB)
                      }
                    >
                      <Icon2 name="circle" size={30} color="#ff9494" />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      vertical
                      transparent
                      onPress={() =>
                        this.theme(setColor, "#fff694", "themeC", color, themeC)
                      }
                    >
                      <Icon2 name="circle" size={30} color="#fff694" />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      vertical
                      transparent
                      onPress={() =>
                        this.theme(setColor, "#a4ff94", "themeD", color, themeD)
                      }
                    >
                      <Icon2 name="circle" size={30} color="#a4ff94" />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      vertical
                      transparent
                      onPress={() =>
                        this.theme(setColor, "#94c4ff", "themeE", color, themeE)
                      }
                    >
                      <Icon2 name="circle" size={30} color="#94c4ff" />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      vertical
                      transparent
                      onPress={() =>
                        this.theme(setColor, "#6047ff", "themeF", color, themeF)
                      }
                    >
                      <Icon2 name="circle" size={30} color="#6047ff" />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      vertical
                      transparent
                      onPress={() =>
                        this.theme(setColor, "#a947ff", "themeG", color, themeG)
                      }
                    >
                      <Icon2 name="circle" size={30} color="#a947ff" />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      vertical
                      transparent
                      onPress={() =>
                        this.theme(setColor, "#ff47f9", "themeH", color, themeH)
                      }
                    >
                      <Icon2 name="circle" size={30} color="#ff47f9" />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      vertical
                      transparent
                      onPress={() =>
                        this.theme(setColor, "#ed3169", "themeI", color, themeI)
                      }
                    >
                      <Icon2 name="circle" size={30} color="#ed3169" />
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </ListItem>

            <ListItem
              noBorder
              style={{ justifyContent: "center", marginTop: 50 }}
            >
              <Button
                style={{
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#e5e5e5",
                  borderRadius: 50,
                  borderWidth: 1,
                }}
                transparent
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Text style={{ textAlign: "center" }}>Guardar cambios</Text>
              </Button>
            </ListItem>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
export default withGlobalContext(Settings);
