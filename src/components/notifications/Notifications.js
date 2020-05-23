import React from 'react';
import { Notifications } from 'expo';
import { Constants } from 'expo-constants';

import * as Permissions from 'expo-permissions';

import { Text, View, Button } from 'react-native';

export default class SendNotifications extends React.Component {


    componentDidMount() {
        this.alertIfRemoteNotificationsDisabledAsync()
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('notifications-messages', {
              name: 'notifications-messages',
              sound: true,
              priority: 'max',
              vibrate: [0, 250, 250, 250],
            });
          }
          Notifications.createCategoryAsync('categoryNot', [
            {
              actionId: 'vanillaButton',
              buttonTitle: 'Plain Option',
              isDestructive: false,
              isAuthenticationRequired: false,
            },
            {
              actionId: 'highlightedButton',
              buttonTitle: 'Destructive!!!',
              isDestructive: true,
              isAuthenticationRequired: false,
            },
            {
              actionId: 'requiredAuthenticationButton',
              buttonTitle: 'Click to Authenticate',
              isDestructive: false,
              isAuthenticationRequired: true,
            },
            {
              actionId: 'textResponseButton',
              buttonTitle: 'Click to Respond with Text',
              textInput: { submitButtonTitle: 'Send', placeholder: 'Type Something' },
              isDestructive: false,
              isAuthenticationRequired: false,
            },
          ]);  
    }
    async alertIfRemoteNotificationsDisabledAsync() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
        alert('Hey! You might want to enable notifications for my app, they are good.');
    }
}

scheduleNotification = async () => {
    const localNotification = {
        title: 'Original Title',
        body: 'And here is the body!',
        categoryId:'categoryNot',
        android: {
            channelId: 'notifications-messages',
            vibrate: [0, 250, 250, 250],
            sound: true,
            icon: './icon.png',

          },
          ios: {
            sound: true
          }

    };

    const schedulingOptions = {
        time: (new Date()).getTime() + (500)
    }
    const id = await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
    // If you want to react even when your app is still in the
    // foreground, you can listen to the event like this:
    Notifications.addListener(() => {
        console.log('triggered!');
    });
};

render() {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>

            <Button
                title={'Press to schedule notification in 2 minutes'}
                onPress={() => this.scheduleNotification()}
            />
        </View>
    );
}
}

/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS

    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["YOUR RECEIPTID STRING HERE"]
      }'

    */
