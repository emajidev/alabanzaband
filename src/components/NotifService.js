import {  Text, View, Vibration, AppState } from 'react-native';
import React, { Component } from 'react';
class AppStateExample extends Component {
  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    }else(
      console.log("in background")
    )
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>Current state is: {this.state.appState}</Text>
      </View>

     )
  }
}
export default class Home extends React.Component {

  
    render() {
        return (
          <AppStateExample />
        );
    }
}