/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
var fetch = require("fetch");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//send the push notification 
exports.sendPushNotification = functions.database.ref('/contacts').onCreate(snapshot => {
    console.log("valor test",snapshot.val())
    var messages = [{
    "to": "ExponentPushToken[BY6vrdFmBIE5ihdUq2PDiL]",
    "sound": "default",
    "body": "New Note Added"
    }]

    return fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messages)

            });

    //return the main promise 
    


    
});