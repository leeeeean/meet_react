import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, TextInput, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import {ImagePicker, Permissions, Constants} from 'expo';
import RadioForm from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import styled from 'styled-components/native';
import styles from '../constants/infoStyle';
import apiService from '../services/ApiService';

const SectionRow = styled.View`
  flex: 1;
  background: #fff;
  flexDirection: row;
  alignItems: center;
`;
const InfoText= styled.Text`
  color: #000;
  fontSize: 16px;
  padding: 0;
  margin-bottom: 17px;
  margin-right: 30px;
`;

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    apiService.setNavigation(this.props.navigation);
    this.state={
      data: this.props.navigation.getParam('data'),
      // data : name, email, pwd, age, sex
      avatar: '',
      intro: '', 
      min: 20,
      max: 30,
      image: null
    };
    console.log(this.state.data);
  }
  render() {

    let { image } = this.state;
    const type = [{label: '비슷한?', value: 0}, {label: '반대의?', value: 1}];
    let data = [{value:'a'}, {value:'a'}, {value:'a'}, {value:'a'}, {value:'a'}];

    return (
      <ScrollView
        style={{ flex: 1, background: '#fff'}}
        contentContainerStyle={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <Image
          source={require('../assets/images/heart.png')}
          style={{ width: 100, height: 100, marginTop: 30, marginBottom: 10 }}
        />
        <Icon
          style={{ marginVertical: 10 }}
          name='plus-circle'
          type='font-awesome'
          size={30}
          color='#aaa'
          onPress={this._pickImage}
        />
        { image &&
        <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 30 }} />}
        <SectionRow style={{ marginTop: 10 }}>
          {/* <InfoText>나를 소개하는 한마디</InfoText> */}
          <TextInput  
            placeholder="나를 소개하는 한마디"  
            style={{ textAlign: 'center', borderBottomColor: '#e68e95', borderBottomWidth: 2, marginRight: 10, marginBottom: 17, width: 250 }}  
            keyboardType={'numeric'} 
            onChangeText={(intro) => this.setState({ intro })}
          />
        </SectionRow>
        <SectionRow style={{ marginTop: 10 }}>
          <InfoText>나이제한</InfoText>
          <TextInput  
            placeholder="최소"  
            style={{ textAlign: 'center', borderBottomColor: '#e68e95', borderBottomWidth: 2, marginRight: 10, marginBottom: 17, width: 50 }}  
            keyboardType={'numeric'} 
            onChangeText={(min) => this.setState({ min })}
          />
          <TextInput  
            placeholder="최대"  
            style={{ textAlign: 'center', borderBottomColor: '#e68e95', borderBottomWidth: 2, marginBottom: 17, width: 50 }}  
            keyboardType={'numeric'} 
            onChangeText={(max) => this.setState({ max })}
          />    
        </SectionRow>
        <Dropdown 
          label='성격'
          value={'??'}
          data={data}
          containerStyle={{ width: 200 }}
        />
        <Dropdown 
          label='직업'
          value={'??'}
          data={data}
          containerStyle={{ width: 200 }}
        />
        <Dropdown 
          label='영화취향'
          value={'??'}
          data={data}
          containerStyle={{ width: 200 }}
        />
        <Dropdown 
          label='음악취향'
          value={'??'}
          data={data}
          containerStyle={{ width: 200 }}
        />
        <Text
          style={{ color: '#e68e95', fontSize: 13, marginVertical: 10,}}
        >당신의 타입은?</Text>
        <RadioForm 
          radio_props={type}
          initial={0}
          labelStyle={{width: 70}}
          buttonColor={'#e68e95'}
          selectedButtonColor={'#e68e95'}
          formHorizontal={true}
          labelHorizontal={true}
          animation={true}
          // onPress={(value) => {this.setState({value:value});}}
          style={{ marginBottom: 20 }}
        />
        <TouchableOpacity 
          style={styles.colorButtonStyle}
          onPress={() => {
            this.onPress(this.state);
          }}
        >
          <Text
            style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}
          >내 정보 저장</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  onPress(data) {
    console.log(data);
    if (data.avatar =='' || data.intro ==''){
      Alert.alert(
        '넘어갈수 없어요!!',
        '사진과 자기 소개를 추가해 주세요 :)',
        [{ text: 'Cancel', style: 'cancel' },
          {text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      apiService.signin(data).then(resp => {
        console.log('??',resp.data.state);
        console.log('??',resp.data.err);
        if (resp.data.state == 1) {
          apiService.setToken(resp.data.token);
          this.props.navigation.navigate('MyPage');
        } else {
          Alert.alert(
            '문제가 발생했습니다..',
            '다시한번 더 시도해 주세요!',
            [{ text: 'OK', onPress: () => { this.props.navigation.navigate('Singin'); } }],
            { cancelable: false },
          );
        }
      });
    }
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
