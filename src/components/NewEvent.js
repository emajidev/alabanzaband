import React, { Component } from "react";
import { Text } from "react-native";
import { Container, Header,Body, Content, Footer, FooterTab, Tabs, Tab, TabHeading } from 'native-base';
import { withGlobalContext } from './UserContext';
import ScheduleTypeA from './scheduledEvents/ScheduleTypeA'
import { withNavigation } from "react-navigation";

class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
    }
  }


  render() {

    return (
      <Container>
        <Header>
          <Body style={{alignItems:'center'}} >
            <Text>Programa tu evento</Text>
          </Body>
     
        </Header>
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Text>Continuo</Text>
              </TabHeading>
            }
          >
            <ScheduleTypeA />

          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Intermitente</Text>
              </TabHeading>
            }
          >

          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Periodico</Text>
              </TabHeading>
            }
          >
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Horario</Text>
              </TabHeading>
            }
          >
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
export default withNavigation(withGlobalContext(NewEvent));
