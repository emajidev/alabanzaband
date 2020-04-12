import React, { Component } from 'react'
import turquesa from '../../native-base-theme/variables/turquesa';
import {AsyncStorage } from 'react-native';
import md5 from 'md5';

const UserContext = React.createContext(true)

class UserProvider extends Component {
  async componentDidMount() {
   await this.getStore();
  }

  getUriCache(email){
    console.log("vacio",email)
    


}

  getStore = async () => {
    console.log("store llamado");
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // We have data!!
        let data = JSON.parse(value)
        let userMd5 = md5(data.user)
        this.setState({ account:userMd5 });
        this.setState({ friends:[data.user] });
       
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
        name:'',
        theme:turquesa,
    },
    calendar:false,
    friends:[],
    songs:[],
    temporalGroup:''
    
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
    
    friends.map((email)=>{
      this.state.friends.push(email)
    }) 
    Array.prototype.unique=function(a){
      return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
    });
    let newArray  = this.state.friends.unique()
    this.setState(prevState => ({ friends:newArray}))
  }
  setSongs = songs => {
    this.setState(prevState => ({ songs }))
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
          setCalendar:this.setCalendar,
          setFriends:this.setFriends,
          setSongs:this.setFriends,
          setTemporalGroup:this.setTemporalGroup,
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
      context => <ChildComponent {...props} global={context}  />
    }
  </UserContext.Consumer>
);
export default UserContext

export { UserProvider, withGlobalContext}