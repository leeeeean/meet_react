import React, { Component } from 'react';
import { Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import styles from '../constants/infoStyle';
import apiService from '../services/ApiService';


const SectionCol = styled.View`
  flex: 1;
  background: #fff;
  flexDirection: column;
  alignItems: center;
`;
const LoginInfo = styled.Text`
  padding: 0;
  margin-top: 17px;
  margin-bottom: 8px;
  color: gray;
`;

export default class LoginScreen extends Component {
  
  constructor(props) {
    super(props);
    apiService.setNavigation(this.props.navigation);
    this.state={
      email: '',
      password: ''
    };
  }

  onPress(data) {
    if (data.email =='' || data.password ==''){
      Alert.alert(
        '넘어갈수 없어요!!',
        '아이디와 비밀번호 모두 적어주세요!!',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    } else {
      apiService.login(data).then(resp => {
        console.log('??',resp.data.state);
        if (resp.data.state == 1) {
          apiService.setToken(resp.data.token);
          this.props.navigation.navigate('MyPage');
        } else {
          Alert.alert(
            '존재하지 않습니다',
            '아이디나 비밀번호가 틀렷는지 확인해 보세요!',
            [
              { text: 'OK', onPress: () => {  } },
            ],
            { cancelable: false },
          );
        }
      });
    }
  } 
  render() {
    return (
      <SectionCol>
        <Image
          source={require('../assets/images/heart.png')}
          style={{ width: 300, height: 300, marginTop: 130 }}
        />
        <TextInput
          placeholder='아이디'
          autoCompleteType='email'
          style={styles.radiusInputStyle}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder='패스워드'
          style={styles.radiusInputStyle}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity 
          style={styles.colorButtonStyle}
          onPress={() => {
            console.log(this.state);
            this.props.navigation.navigate('MyPage');
            // this.onPress(this.state);
          }}
        >
          <Text
            style={{ color: '#fff', fontSize: 16 }}
          >로그인</Text>
        </TouchableOpacity>
        <LoginInfo>아직 meetYou의 회원이 아니신가요?</LoginInfo>
        <TouchableOpacity 
          style={styles.whiteButtonStyle}
          onPress={() => this.props.navigation.navigate('Signin')}
        >
          <Text
            style={{ color: '#000', fontSize: 16 }}
          >회원가입</Text>
        </TouchableOpacity>
      </SectionCol>
    );
  }
}