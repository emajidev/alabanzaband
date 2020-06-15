import React, { Component } from 'react'
import turquesa from '../../native-base-theme/variables/turquesa';
import { AsyncStorage } from 'react-native';
import * as firebase from "firebase/app";
import { db } from "./firebase.js";
const UserContext = React.createContext(true)
import Base64 from 'Base64';

class UserProvider extends Component {
  async componentDidMount() {
    await this.getStore();
  }

  getUriCache(email) {
    console.log("vacio", email)
  }
  songsBd() {
    let itemsRef = db.ref("/songs");
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      if (data !== null) {
        let songs = Object.values(data);
        this.setState({ songsDb: songs });
        console.log("canciones", songs)
      }
    });
  }
  getStore = async () => {
    console.log("store llamado");
    this.songsBd()
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // We have data!!
        let data = JSON.parse(value)
        let userMd5 = Base64.btoa(data.user)
        this.setState({ account: userMd5 });
        this.setState({ friends: [data.user] });

      } else {
        console.log("nullstore");
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // Context state
  state = {
    color: {
      name: '',
      theme: turquesa,
      color:'rgba(80,227,194,1)'
    },
    text:'',
    calendar: false,
    friends: [],
    songs: [],
    events:[],
    temporalGroup: '',
    songsDb:[]

  }

  // Method to update state
  setColor = color => {
    this.setState(prevState => ({ color }))
  }
  setText = text => {
    this.setState(prevState => ({ text }))
  }
  setAccount = account => {
    this.setState(prevState => ({ account }))
  }
  setCalendar = calendar => {
    this.setState(prevState => ({ calendar }))
  }
  setTemporalGroup = temporalGroup => {
    this.setState(prevState => ({ temporalGroup }))
  }
  setFriends = friends => {

    friends.map((email) => {
      this.state.friends.push(email)
    })
    Array.prototype.unique = function (a) {
      return function () { return this.filter(a) }
    }(function (a, b, c) {
      return c.indexOf(a, b + 1) < 0
    });
    let newArray = this.state.friends.unique()
    this.setState(prevState => ({ friends: newArray }))
  }
  setEvents = events => {
    this.setState(prevState => ({ events: events }))
  }
  setSongs = songs => {
    songs.map((item) => {
      this.state.songs.push(item)
    })
    Array.prototype.unique = function (a) {
      return function () { return this.filter(a) }
    }(function (a, b, c) {
      return c.indexOf(a, b + 1) < 0
    });
    let newArray = this.state.songs.unique()
    this.setState(prevState => ({ songs: newArray }))
  }

  render() {
    const { children } = this.props
    const color= this.state.color
    const { setColor } = this
    const calendar = this.state.calendar
    const friends = this.state.friends
    const songs = this.state.songs
    const events = this.state.events
    const text = this.state.text
    const temporalGroup = this.state.temporalGroup
    const songsDb = this.state.songsDb
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setColor: this.setColor,
          setAccount:this.setAccount,
          setCalendar: this.setCalendar,
          setFriends: this.setFriends,
          setSongs: this.setSongs,
          setEvents:this.setEvents,
          setText:this.setText,
          setTemporalGroup: this.setTemporalGroup,
          color,
          calendar,
          friends,
          songs,
          songsDb,
          events,
          temporalGroup

        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
// create the consumer as higher order component
const withGlobalContext = ChildComponent => props => (
  <UserContext.Consumer>
    {
      context => <ChildComponent {...props} global={context} />
    }
  </UserContext.Consumer>
);
export default UserContext

export { UserProvider, withGlobalContext }