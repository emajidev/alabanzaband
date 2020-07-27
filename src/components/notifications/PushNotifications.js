export async function PushNotifications(token){
    var messages = [{
        "to": token,
        "title": 'Felicitaciones!...',
        "body": "You've got mail",
        "channelId":"default"
        
      }]
  
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages)
  
      });
}