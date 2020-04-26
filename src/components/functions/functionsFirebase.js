import { db } from '../firebase';
import md5 from 'md5';

export async function pushEvent(yourEmail, members, event) {
    console.log("data fire",yourEmail, members, event)
    try {
        members.map((friend, index) => {
            //buzon de recibido 
            const arrival = db.ref('/users/user' + md5(friend) + '/' + 'events')
            arrival.push(
                {
                    sender: yourEmail,
                    director: yourEmail,
                    members: friend,
                    event:event,
                    accepted: 'waiting',
                    toSent: 'yes',
                    read: false
                }
            ).then((snapshot) => {
                //buzon de envio 
                arrival.child(snapshot.key).update({ "id": snapshot.key })
        
            });
        })

    } catch (error) {
        console.log("error send and received notifications", error)
    }
}
