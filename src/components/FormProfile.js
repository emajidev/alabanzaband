import React, { Component } from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import CodeCountries from  './codeCountries/CodeCountries'

export default class FormProfile extends Component {
  constructor() {
    super();
    this.state = {
      language: ''
    };
}
  componentDidMount() {
  }
  state = {
    saludo: "Saludos"
  }
  handler = (param) => {
    this.setState({
      saludo: param
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>idioa,{this.state.saludo}</Text>
        <View style={styles.formatPhoneNumber}>
          <Text>Ingrese telf</Text>
          <CodeCountries handler={this.handler} />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  formatPhoneNumeber:{
    flexDirection:'row'
  }
});
