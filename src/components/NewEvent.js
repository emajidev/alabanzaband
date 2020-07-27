import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import { Container, Header, StyleProvider, Body, Content, Footer, FooterTab, Tabs, Tab, TabHeading } from 'native-base';
import { withGlobalContext } from './UserContext';
import ScheduleTypeA from './scheduledEvents/ScheduleTypeA'
import ScheduleTypeB from './scheduledEvents/ScheduleTypeB'
import getTheme from "../../native-base-theme/components";
import Icon from 'react-native-vector-icons/Feather';
import themeA from '../../native-base-theme/variables/themeA';
import themeB from '../../native-base-theme/variables/themeB';
import themeC from '../../native-base-theme/variables/themeC';
import themeD from '../../native-base-theme/variables/themeD';
import themeE from '../../native-base-theme/variables/themeE';
import themeF from '../../native-base-theme/variables/themeF';
import themeG from '../../native-base-theme/variables/themeG';
import themeH from '../../native-base-theme/variables/themeH';
import themeI from '../../native-base-theme/variables/themeI';

import { withNavigation } from "react-navigation";

class NewEvent extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false;

    this.setTheme = this.setTheme.bind(this)
    this.state = {
      theme: '',
      colorTag: '#50e2c3ff'
    }
  }

  setTheme(theme, colorTag) {
    //console.log("theme", theme)
    this.setState({ colorTag: colorTag })
    switch (theme) {
      case 'themeA':
        this.setState({ theme: themeA })
        break
      case 'themeB':
        this.setState({ theme: themeB })
        break
      case 'themeC':
        this.setState({ theme: themeC })
        break
      case 'themeD':
        this.setState({ theme: themeD })
        break
      case 'themeE':
        this.setState({ theme: themeE })
        break
      case 'themeF':
        this.setState({ theme: themeF })
        break
      case 'themeG':
        this.setState({ theme: themeG })
        break
      case 'themeH':
        this.setState({ theme: themeH })
        break
      case 'themeI':
        this.setState({ theme: themeI })
    }

  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ theme: themeA })
    }

  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const theme = this.state.theme

    return (
      <Container>
        <Header style={{ marginBottom: 20, elevation: 0 }} iosBarStyle={"dark-content"} >
          <StatusBar
            backgroundColor={this.state.colorTag}
            barStyle="light-content"
          />
          <Body style={{ alignItems: 'center', }} >
            <Text style={{ color: [this.state.colorTag], fontSize: 20 }}>Programa tu evento</Text>
          </Body>

        </Header>
        <ScheduleTypeA setTheme={this.setTheme} />

      </Container>
    );
  }
}
export default withGlobalContext(withNavigation(NewEvent));
