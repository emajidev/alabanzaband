import React, { Component } from 'react'
import turquesa from '../../native-base-theme/variables/turquesa';
import {AsyncStorage } from 'react-native';
import md5 from 'md5';

const UserContext = React.createContext(true)

class UserProvider extends Component {
  componentDidMount() {
    this.getStore();
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
    task:{
      data:''
    }
  }

  // Method to update state
  setUser = user => {
    this.setState(prevState => ({ user }))
  }
  setTask = task => {
    this.setState(prevState => ({ task }))
  }

  render() {
    const { children } = this.props
    const { user } = this.state
    const { setUser } = this
    const task = this.state.task
    return (
      <UserContext.Provider
         value={{
          ...this.state,
          setUser: this.setUser,
          setTask:this.setTask,
          task
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