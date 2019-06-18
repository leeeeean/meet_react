import React, { Component } from 'react';
import { StyleSheet, Button, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import styles from '../constants/infoStyle';
import apiService from '../services/ApiService';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ImagePicker, Permissions, Constants} from 'expo';

const SectionCol = styled.View`
  flex: 1;
  background: #fff;
  flexDirection: column;
  alignItems: center;
`;
const SectionRow = styled.View`
  flexDirection: row;
  alignItems: center;
`;
const LoginInfo = styled.Text`
  padding: 0;
  margin-top: 17px;
  margin-bottom: 8px;
  color: gray;
`;

export default class MyPageScreen extends Component{
  constructor(props) {
    super(props);
    apiService.setNavigation(this.props.navigation);
    this.state={
      name: 'gimamugae',
      age: 25,
      intro: 'hihi',
      image: null
    };
  }
  static navigationOptions = {
    title: 'MyPage',
  };
  render(){
    let { image } = this.state;
return(
      <SectionCol>
        <SectionRow>
          <Image
            source={require('../assets/images/heart.png')}
            style={{ width: 200, height: 200, borderRadius: 50, }}
          />
          <SectionCol style={{marginRight: 100}}>
            <SectionRow>
              <Text
                style={{ color: '#000', fontSize: 13, marginRight: 10 }}
              >이름</Text>
              <Text
                style={{ color: '#000', fontSize: 16 }}
              >{this.state.name}</Text>
            </SectionRow>
            <SectionRow>
              <Text
                style={{ color: '#000', fontSize: 13, marginRight: 10 }}
              >나이</Text>
              <Text
                style={{ color: '#000', fontSize: 16 }}
              >{this.state.age}</Text>
            </SectionRow>
            <SectionRow>
              <Text
                style={{ color: '#000', fontSize: 13, marginRight: 10 }}
              >내 소개</Text>
              <Text
                style={{ color: '#000', fontSize: 16 }}
              >{this.state.intro}</Text>
            </SectionRow>
          </SectionCol>
        </SectionRow>
        <LoginInfo>사진을 추가해 보세요!</LoginInfo>
        <SectionRow>
          <Icon
            style={{ margin: 30}}
            name='plus-circle'
            type='font-awesome'
            size={30}
            color='#aaa'
            onPress={this._pickImage}
          />
          { image &&
          <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 30 }} />}
          <Icon
            style={{ margin: 30}}
            name='plus-circle'
            type='font-awesome'
            size={30}
            color='#aaa'
            onPress={this._pickImage}
          />
          { image &&
          <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 30 }} />}
          <Icon
            style={{ margin: 30}}
            name='plus-circle'
            type='font-awesome'
            size={30}
            color='#aaa'
            onPress={this._pickImage}
          />
          { image &&
          <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 30 }} />}
        </SectionRow>
      </SectionCol>
    );
  }

  componentDidMount(){
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        console.alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.setState({ avatar: result.uri });
    }
  };

}

