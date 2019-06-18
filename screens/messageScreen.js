import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../services/fire';

export default class MsgScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  })

  state = {
    message: [],
  };
  
  get user() {
    // Return our name and our UID for GiftedChat to parse
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }
  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }

  render() {
    const mainContent = (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
    if (Platform.OS === 'android') {
      return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding"  keyboardVerticalOffset={80} enabled>
          {mainContent} 
        </KeyboardAvoidingView>
      );
    } else {
      return (<SafeAreaView style={{flex: 1}}>
        {mainContent}
      </SafeAreaView>)
    }
  }


}
