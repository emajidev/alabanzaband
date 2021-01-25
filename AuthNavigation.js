import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Presentation from "./src/components/Presentation.js";
import Loading from "./src/components/Loading.js";
import SignUp from "./src/components/SignUp.js";
import Login from "./src/components/Login.js";
import FormProfile from "./src/components/FormProfile";
import Director from "./src/components/kindProfile/Director";
import Performer from "./src/components/kindProfile/Performer";
import MusicSelect from "./src/components/kindProfile/forms/MusicSelect";
import MusicalInformation from "./src/components/kindProfile/forms/MusicalInformation";

import FinishProfile from "./src/components/kindProfile/forms/FinishProfile"
import RecoverPassword from "./src/components/RecoverPassword";
const AuthNavigation = createStackNavigator(
  {
    Presentation: { screen: Presentation },
    Loading: { screen: Loading },
    SignUp: { screen: SignUp },
    Login: { screen: Login },
    RecoverPassword: { screen: RecoverPassword },
    FormProfile: { screen: FormProfile },
    Performer: { screen: Performer },
    MusicSelect:{screen:MusicSelect},
    MusicalInformation:{screen:MusicalInformation},
    Director: { screen: Director },
    FinishProfile:{screen:FinishProfile}
  },
  { headerMode: "none", initialRouteName: "Presentation" }
);

const Auth = createAppContainer(AuthNavigation);

export default Auth;

