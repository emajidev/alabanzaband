import React, { Component } from 'react'
import turquesa from '../../native-base-theme/variables/turquesa';
import { AsyncStorage } from 'react-native';
import md5 from 'md5';

const UserContext = React.createContext(true)

class UserProvider extends Component {
  async componentDidMount() {
    await this.getStore();
    this.songsBd()
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
        this.setState({ songsItems: songs });
        console.log("canciones", songs)
      }
    });
  }
  getStore = async () => {
    console.log("store llamado");
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // We have data!!
        let data = JSON.parse(value)
        let userMd5 = md5(data.user)
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
    user: {
      name: '',
      theme: turquesa,
    },
    calendar: false,
    friends: [],
    songs: [],
    temporalGroup: '',
    songsItems:[]

  }

  // Method to update state
  setUser = user => {
    this.setState(prevState => ({ user }))
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
    const { user } = this.state
    const { setUser } = this
    const calendar = this.state.calendar
    const friends = this.state.friends
    const songs = this.state.songs
    const temporalGroup = this.state.temporalGroup
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
          setCalendar: this.setCalendar,
          setFriends: this.setFriends,
          setSongs: this.setSongs,
          setTemporalGroup: this.setTemporalGroup,
          calendar,
          friends,
          songs,
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