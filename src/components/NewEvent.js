import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { withNavigation } from 'react-navigation';

class NewEvent extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Título" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default withNavigation(NewEvent);
