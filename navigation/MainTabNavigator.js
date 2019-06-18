import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import MyPageScreen from '../screens/myPageScreen';
import MsgListScreen from '../screens/messageListScreen';
import MsgScreen from '../screens/messageScreen';
import ListScreen from '../screens/listScreen';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

const tabOption = { 
  activeTintColor: Colors.tabIconSelected,
  inactiveTintColor: Colors.tabIconDefault,
  labelStyle: { fontWeight: 'bold' }
};

const MyPageStack = createStackNavigator({
  MyPage: MyPageScreen
});

MyPageStack.navigationOptions = {
  tabBarLabel: 'MyPage',
  tabBarOptions: tabOption,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-person' : 'md-person'}
    />
  ),
};



const ListStack = createStackNavigator({
  List: ListScreen,
  YourPage: MyPageScreen,
  Msg: MsgScreen
},{
  initialRouteName:'List'
});

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarOptions: tabOption,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

const MsgListStack = createStackNavigator({
  MsgList: MsgListScreen,
  Msg: MsgScreen,
  YourPage: MyPageScreen,
},{
  initialRouteName: 'MsgList'
});

MsgListStack.navigationOptions = {
  tabBarLabel: 'MsgList',
  tabBarOptions: tabOption,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
    />
  ),
};

export default createBottomTabNavigator({
  MyPageStack,
  ListStack,
  MsgListStack,
});
