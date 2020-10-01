import React from "react";
import { Notifications } from "expo";
import { Constants } from "expo-constants";
import moment from "moment";
import * as Permissions from "expo-permissions";

import { Text, View, Button } from "react-native";

export function chanelNotifications() {
  alertIfRemoteNotificationsDisabledAsync();
  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("notifications-messages", {
      name: "notifications-messages",
      sound: true,
      priority: "max",
      vibrate: [0, 250, 250, 250],
      color: "#4ff",
      icon: "./assets/icons/icon.png",
    });
  }
  Notifications.createCategoryAsync("scheduleNotify", [
    {
      actionId: "highlightedButton",
      buttonTitle: "ver",
      isDestructive: true,
      isAuthenticationRequired: false,
    },
    /*   {
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
      */
  ]);
}
async function alertIfRemoteNotificationsDisabledAsync() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    alert(
      "Hey! You might want to enable notifications for my app, they are good."
    );
  }
}

export async function SendNotifications() {
  const localNotification = {
    title: "Felicitaciones!...",
    body: "Se enviado tu respuesta con Exito! ",

    android: {
      channelId: "notifications-messages",
      vibrate: [0, 250, 250, 250],
      sound: true,
      icon: "./icon.png",
    },
    ios: {
      sound: true,
    },
  };

  let schedulingOptions = {
    time: new Date().getTime() + 500,
  };
  const id = await Notifications.scheduleLocalNotificationAsync(
    localNotification,
    schedulingOptions
  );
  // If you want to react even when your app is still in the
  // foreground, you can listen to the event like this:
  Notifications.addListener(() => {
    console.log("triggered!");
  });
}

export async function SendNotificationSchedule(msg, timeStamp) {
  const localNotification = {
    title: "Tienes una actividad para hoy",
    body: msg,

    android: {
      channelId: "notifications-messages",
      vibrate: [0, 250, 250, 250],
      sound: true,
      icon: "./icon.png",
      badge: true,
    },
    ios: {
      sound: true,
    },
  };
  let timeCurrent = new Date().getTime();
  let schedulingOptions = {
    time: timeStamp,
  };

  if (timeStamp > timeCurrent) {
    for (let i = 0; i < 1; i++) {
      const id = await Notifications.scheduleLocalNotificationAsync(
        localNotification,
        schedulingOptions
      );

      listenForNotifications();
    }
  } else {
    console.log("se pasa de tiempo", timeStamp, timeCurrent);
  }
} //Maximum schedule notification is 64 on ios.

listenForNotifications = () => {
  Notifications.addListener((notification) => {
    console.log("received notification");
  });
};
