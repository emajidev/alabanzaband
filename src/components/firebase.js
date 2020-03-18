import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyC9pPxtwaSkL8M-6T1tv6-ZYWtUmtoJlWs",
    authDomain: "alabanzaband.firebaseapp.com",
    databaseURL: "https://alabanzaband.firebaseio.com",
    projectId: "alabanzaband",
    storageBucket: "gs://alabanzaband.appspot.com",
    messagingSenderId: "1085755789248",
    appId: "1:1085755789248:web:66c67449de5dc516cac225",
    measurementId: "G-WWJHTYRF48"
  };
let app = Firebase.initializeApp(config);
export const  storage = app.storage();
export const  db = app.database();
