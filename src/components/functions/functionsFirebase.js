import { db } from "../firebase";
//import md5 from "md5";
import * as firebase from "firebase/app";
import Base64 from "Base64";

export async function pushEvent(members, event) {
  try {
    members.map((friend, index) => {
      //buzon de recibido

      let yourEmail = firebase.auth().currentUser.email;
      let convertMd5 = Base64.btoa(yourEmail);

      console.log("data fire", yourEmail, members, event);
      let status = convertMd5 == friend ? "accept" : "waiting";
      const arrival = db.ref("/users/user" + Base64.btoa(friend) + "/events");
      if (event.type === "timeline") {
        arrival
          .push({
            sender: yourEmail,
            director: yourEmail,
            members: members,
            accepted: status,
            toSent: "yes",
            read: false,
            title: event.title,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            colorTag: event.colorTag,
            uid: event.uid,
            songs: event.songs,
          })
          .then((snapshot) => {
            //buzon de envio
            arrival.child(snapshot.key).update({ id: snapshot.key });
          });
      }
      if (event.type === "repeatDays") {
        arrival
          .push({
            type: event.type,
            sender: yourEmail,
            director: yourEmail,
            members: members,
            accepted: status,
            toSent: "yes",
            read: false,
            title: event.title,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            colorTag: event.colorTag,
            uid: event.uid,
            songs: event.songs,
            days: event.days,
          })
          .then((snapshot) => {
            //buzon de envio
            arrival.child(snapshot.key).update({ id: snapshot.key });
          });
      }
    });
  } catch (error) {
    console.log("error send and received notifications", error);
  }
}

export async function changeStatus(yourEmail, id, statusChange) {
  try {
    db.ref("/users/user" + yourEmail + "/events/" + id).update({
      accepted: statusChange,
    });
  } catch (error) {
    console.log("error send and received notifications", error);
  }
}

export async function removeEvent(yourEmail, id) {
  try {
    let event = db.ref("/users/user" + yourEmail + "/events/" + id);
    event.remove();
  } catch (error) {
    console.log("error remove event", error);
  }
}

