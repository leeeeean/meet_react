import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/loginScreen';
import SigninScreen from '../screens/signinScreen';
import InfoScreen from '../screens/infoScreen';
import MyPageScreen from '../screens/myPageScreen';

const LoginStack = createStackNavigator({
  Login: LoginScreen,
  Signin: SigninScreen,
  Info: InfoScreen,
  MainPage: MyPageScreen
},{
  initialRouteName: 'Login',
  headerMode: 'none'
});



export default LoginStack;