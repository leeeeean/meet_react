import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInStack from './SinginNavigator';

export default createAppContainer(createSwitchNavigator({
  Main: MainTabNavigator,
  Auth: SignInStack, 
}, {
  initialRouteName: 'Auth'
}));