import React, {Component} from 'react';
import {TextInput, View, Keyboard,Text,TouchableHighlight,Platform} from 'react-native';
import { Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Timer extends Component {
    componentDidMount() {
        // ...
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('chat-messages', {
              name: 'Chat messages',
              sound: true,
            });
          }
       

   }
    sendNotificationImmediately = async () => {
        let notificationId = await Notifications.presentLocalNotificationAsync({
          sound: 'default',
          title: 'This is crazy',
          body: 'Your mind will blow after reading this',
          android: {
            channelId: 'chat-messages',
            vibrate: [0, 250, 250, 250],
            color: '#FF0000'
          },
        });
        console.log(notificationId); // can be saved in AsyncStorage or send to server
      };
    render() {
        return (
            <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
              <Text >Notificacion</Text>      
              <TouchableHighlight 
              onPress={this.sendNotificationImmediately}
              >
                <Text >Enviar</Text>     
              </TouchableHighlight>
            </View>
        );
    }
};