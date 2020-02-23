import { db } from '../firebase';

async function _promise(phone,id){
    const itemsRef = db.ref('/users/user'+phone+'/'+'notificationsSent/' );
    let query = itemsRef.orderByChild('id').equalTo(id).once('value')
    return query
}
export const query_key = async(phone,id)=>{
    var query_key
    try{
        let snapshot = await _promise(phone,id);
        let key = Object.keys(snapshot.val())[0].toString();
        query_key = key
        
       
    }catch(e){
       
        console.log(e)
        
    }
    console.log("key l",query_key)
}

