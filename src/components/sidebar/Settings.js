import React, { Component } from 'react';
import { Container, Grid,Col,Row,Header,Button, Content, Badge, Text, Icon,List ,ListItem} from 'native-base';
import { clearThemeCache } from 'native-base-shoutem-theme'

import Icon2 from 'react-native-vector-icons/FontAwesome';
import UserContext from '../UserContext'

import themeA from '../../../native-base-theme/variables/themeA';
import themeB from '../../../native-base-theme/variables/themeB';
import themeC from '../../../native-base-theme/variables/themeC';
import themeD from '../../../native-base-theme/variables/themeD';

export default class Settings extends Component {
    static contextType = UserContext

    constructor(props) {
    super(props);
    this.state = {
      theme:'',
        };
    }
    themeA(user, setUser) {
    clearThemeCache();
    this.setState({
      theme:themeA
    });
    const newUser = { name: 'themeA', loggedIn: true ,theme:themeA}
    setUser(newUser)
  }
  themeB(user, setUser) {
    clearThemeCache();
    this.setState({
      theme:themeB
    });
    const newUser = { name: 'themeB', loggedIn: true ,theme:themeB}
    setUser(newUser)

  }
  themeC() {
    clearThemeCache();
    this.setState({
      theme:themeC
    });
  }
  themeD() {
    clearThemeCache();
    this.setState({
      theme:themeD
    });
  }
  componentDidMount() {
    const user = this.context
  
  }
  render() {
    const { user, setUser } = this.context

    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
            <Grid padder>
          <Row>
            <Col>
              <Button vertical transparent onPress={() => this.themeA(user, setUser)}>
                <Icon2 name='circle' size={30} color="#00ffc0" />
              </Button>
            </Col>
            <Col>
              <Button vertical transparent onPress={() => this.themeB(user, setUser)}>
                <Icon2 name='circle' size={30} color="#00e241" />
              </Button>
            </Col>
            <Col>
              <Button vertical transparent onPress={() => this.themeC(user, setUser)}>
                <Icon2 name='circle' size={30} color="#0a86d8" />
              </Button>
            </Col>
            <Col>
            <Button vertical transparent onPress={() => this.themeD(user, setUser)}>
              <Icon2 name='circle' size={30} color="#7d392f" />
            </Button>
            </Col>
            <Col>
            <Button vertical transparent >
              <Icon2 name='circle' size={30} color="#000" />
            </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button vertical transparent >
                <Icon2 name='circle' size={30} color="#ff0800" />
              </Button>
            </Col>
            <Col>
              <Button vertical transparent >
                <Icon2 name='circle' size={30} color="#ff0048" />
              </Button>
            </Col>
            <Col>
              <Button vertical transparent >
                <Icon2 name='circle' size={30} color="#ff4300" />
              </Button>
            </Col>
            <Col>
            <Button vertical transparent >
              <Icon2 name='circle' size={30} color="#ffa000" />
            </Button>
            </Col>
            <Col>
            <Button vertical transparent>
              <Icon2 name='circle' size={30} color="#a566ce" />
            </Button>
            </Col>
          </Row>
        </Grid>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}