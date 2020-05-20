import React from 'react';
import { Text, View, Vibration, AppState, TouchableOpacity } from 'react-native';
import { Constants, Notifications, Permissions } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';

async function getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

export default class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notification: {}
        }
    }


    componentDidMount() {
        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );
        getiOSNotificationPermission();
        this.listenForNotifications();
    }

    _handleNotification = notification => {
        if (AppState.currentState == 'active' && notification.origin === 'received') {
            Notifications.dismissNotificationAsync(notification.notificationId);
        } else {
            Vibration.vibrate()
            this.setState({ notification: notification });
        }
    };

    _handleButtonPress = () => {
        const localnotification = {
            title: 'Example Title!',
            body: 'This is the body text of the local notification',
            android: {
                sound: true,
            },
            ios: {
                sound: true,
            },
        };
        let sendAfterFiveSeconds = Date.now();
        sendAfterFiveSeconds += 5000;

        const schedulingOptions = { time: sendAfterFiveSeconds };
        let id = Notifications.scheduleLocalNotificationAsync(
            localnotification,
            schedulingOptions
        );
        this.setState({ id: id });
        let NotId = this.state.id
        console.log(NotId._55);
    };
    listenForNotifications = () => {
        Notifications.addListener(notification => {
            if (notification.origin === 'received' && Platform.OS === 'ios') {
                Alert.alert(notification.title, notification.body);
            }
        });
    };

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this._handleButtonPress}
                >
                    <Text>Enviar notificacion</Text>
                </TouchableOpacity>
                <Text>Push Notifications Sample</Text></View>
        );
    }
}