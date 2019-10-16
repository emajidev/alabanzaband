import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/components/Home.js';
import ListScreen from "./src/components/List";
import LoginScreen from './src/components/Login.js';

const AppNavigator = createStackNavigator({
  Login: {screen: LoginScreen },
  List: {screen: ListScreen},
},

);

const Router = createAppContainer(AppNavigator);

export default Router;