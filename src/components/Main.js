import React from 'react';

import Home from './Home'
import { UserProvider } from './UserContext'
class Main extends React.Component{
  
render(){

  const user = { name: 'Tania', loggedIn: true }

  return (
    <UserProvider value={user}>
      <Home />
    </UserProvider>
  )
}
}
export default Main;

