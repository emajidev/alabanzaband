import React from 'react'
import {View,Text} from 'react-native'
import { GiftedChat,Send } from 'react-native-gifted-chat'
import { db } from "../firebase";
import * as firebase from "firebase/app";
import {withNavigationFocus } from 'react-navigation'

class Chat extends React.Component {
  state = {
    messages: [],
  }
  // 1.
get ref() {
  console.log("props pasados",this.props.navigation.state.params.item  )
  const event_uid = this.props.navigation.state.params.item.id;
  return db.ref('messages/'+event_uid);
}
// 2.
on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => {
        this.parse(snapshot)
      });
// 3.
parse = snapshot => {
    // 1.
    const { createdAt: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    // 2.
    const createdAt = new Date(numberStamp);
    console.log("timestamp2",createdAt)

    // 3.
    const message = {
      _id,
      createdAt,
      text,
      user,
    };
    console.log("mensaje2",message)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }))
}
// 4.
off() {
  this.ref.off();
}


  renderSend = (props) => {
    return (
        <Send {...props} textStyle={{ color: "#32f" }} label={'Enviar'} />

    );
  }

  ///////////////////
  // 1.
get uid() {
  return (firebase.auth().currentUser || {}).uid;
}
// 2.
get timestamp() {
  return firebase.database.ServerValue.TIMESTAMP;
}

// 3.
send = messages => {
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];
    // 4.
    const message ={text, user, createdAt: this.timestamp};
    this.append(message);
  }
};
// 5.
append = message => this.ref.push(message);
//////////////////////////////////
// 1.
componentDidMount() {
  this.on();

}
// 2.
componentWillUnmount() {
  this.off();
}
  render() {
    return (
      <GiftedChat
        placeholder={'Escribe un mensaje...'}
        messages={this.state.messages}
        renderSend = {
            this.renderSend
        }
        onSend={messages => this.send(messages)}
        
        user={{
          _id: this.uid,
        }}
      />
    )
  }
}
export default withNavigationFocus(Chat)