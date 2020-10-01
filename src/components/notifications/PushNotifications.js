const fetch = require("node-fetch");

export async function PushNotifications(token, user, msg) {
  var messages = [
    {
      to: "ExponentPushToken[lDGySgNn3ihN1tTdnThCxa]",
      title: "Nueva respuesta",
      body: user + ", " + msg,
      sound: "default",
    },
  ];

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });
}
