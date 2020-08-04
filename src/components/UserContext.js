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
        //console.log("canciones", songs)
      }
    });
  }
  
  getStore = async () => {
    this.songsBd()
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // We have data!!
        let data = JSON.parse(value)
        let userMd5 = Base64.btoa(data.user)
        let director = Base64.btoa(data.director)
        this.setState({ account: userMd5,director: director, friends: [data.user]});
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
    badge:false, 
    calendar: false, 
    text:'',
    director:'',
    temporalGroup: '',
    songs: [],
    events:[],
    songsDb:[],
    friends: [],
    infoTaskStorage:[],
  }
  // Method to update state
  setBadge = badge => {
    this.setState(prevState =>({badge}))
  }
  setColor = color => {
    this.setState(prevState => ({ color }))
  }
  setText = text => {
    this.setState(prevState => ({ text }))
  }
  setAccount = account => {
    this.setState(prevState => ({ account }))
  }  
  setDirector= director => {
    this.setState(prevState => ({ director }))
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
  setSongs = (songs) => {
    
    if(songs == 'clear'){
      this.setState({ songs: [] })
    }else{
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
  }

  render() {
    const { setColor } =      this
    const { children } =      this.props
    const text         =      this.state.text
    const songs        =      this.state.songs
    const color        =      this.state.color
    const badge        =      this.state.badge
    const events       =      this.state.events
    const friends      =      this.state.friends
    const songsDb      =      this.state.songsDb
    const calendar     =      this.state.calendar
    const director     =      this.state.director
    const temporalGroup =     this.state.temporalGroup
    const infoTaskStorage =   this.state.infoTaskStorage

    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setText:          this.setText,
          setColor:         this.setColor,
          setBadge:         this.setBadge,
          setSongs:         this.setSongs,
          setEvents:        this.setEvents,
          setAccount:       this.setAccount,
          setFriends:       this.setFriends,
          setCalendar:      this.setCalendar,
          setTemporalGroup: this.setTemporalGroup,
          songs,
          color,
          badge,
          events,
          songsDb,
          friends,
          calendar,
          director,
          temporalGroup,
          infoTaskStorage
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