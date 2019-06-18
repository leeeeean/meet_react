import React, { Component } from 'react';

import { 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Picker,
  Alert} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import styled from 'styled-components/native';
import styles from '../constants/infoStyle';
import apiService from '../services/ApiService';

const SectionCol = styled.View`
  flex: 1;
  background: #fff;
  flexDirection: column;
  alignItems: center;
`;

export default class SigninScreen extends Component {

  constructor(props) {
    super(props);
    apiService.setNavigation(this.props.navigation);
    this.state={
      email: '',
      password: '',
      pwdConfig: '',
      sex: 0,
      age: 25,
      check: 0
    };
  }
  configId(data) {
    apiService.configID(data).then(resp => {
      if (resp.data.state == 0) {
        Alert.alert(
          '존재하지 않는 아이디 입니다',
          '이 아이디를 사용하세요!!',
          [{ text: 'OK' , onPress: (check = 1) => { this.setState({check}); }}],
          { cancelable: false },
        );
      } else {
        Alert.alert(
          '존재하는 아이디 입니다',
          '다른 아이디를 입력해주세요!',
          [{ text: 'OK', onPress: () => { this.textInputId.clear(); } }],
          { cancelable: false },
        );
      }
    });
  }

  configPwd(data) {
    if (data.password.length < 5) {
      Alert.alert(
        '비밀번호가 너무 짧습니다',
        '5글자 이상 입력해 주세요!',
        [{ text: 'OK', 
          onPress: () => { 
            this.textInputPwd.clear(); 
            this.textInputPwdCon.clear();
          } }],
        { cancelable: false },
      );
    } else {
      if (data.password != data.pwdConfig) {
        Alert.alert(
          '비밀번호가 서로 다릅니다',
          '다시 입력하세요',
          [{ text: 'OK' ,
            onPress: () => { 
              this.textInputPwd.clear(); 
              this.textInputPwdCon.clear();
            } }],
          { cancelable: false },
        );
      } else {
        this.onPress(data);
      }

    }
    
  }
  onPress(data) {
    console.log(data.check);
    if (data.email =='' || data.password =='' || data.name ==''){
      Alert.alert(
        '넘어갈수 없어요!!',
        '빈칸을 모두 적어주세요!!',
        [{ text: 'Cancel', style: 'cancel' },
          {text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if(data.check == 0){
      Alert.alert(
        '아이디 중복을 확인하세요!!',
        '어서요!!',
        [{ text: 'Cancel', style: 'cancel' },
          {text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      this.props.navigation.navigate('Info', {data: this.state});
      // apiService.signin(data).then(resp => {
      //   if (resp.data.state == 1) {
      //     apiService.setToken(resp.data.token);
      //     this.props.navigation.navigate('Info');
      //   } else {
      //     Alert.alert(
      //       '애러 발생..',
      //       '다시한번 시도해 주세요!',
      //       [
      //         { text: 'OK', onPress: () => {  } },
      //       ],
      //       { cancelable: false },
      //     );
      //   }
      // });
    }
  } 
  render() {
    const sex = [{label: '여성', value: 0}, {label: '남성', value: 1}];
    const age = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
    let ageItems = age.map( (v) => {
      return <Picker.Item key={v} value={v} label={v} />;
    });
    return (
      <SectionCol>
        <Image
          source={require('../assets/images/heart.png')}
          style={{ width: 150, height: 150, marginTop: 30 }}
        />
        <TextInput
          ref={(input) => { this.textInputId = input; }}
          placeholder='아이디'
          style={styles.radiusInputStyle}
          onChangeText={(email) => this.setState({ email })}
        />
        <TouchableOpacity 
          style={styles.whiteButtonStyle}
          onPress={() => {
            this.configId(this.state);
          }}
        >
          <Text
            style={{ color: '#e68e95', fontSize: 13, fontWeight: 'bold' }}
          >중복확인</Text>
        </TouchableOpacity>
        <TextInput
          ref={(input) => { this.textInputPwd = input; }}
          placeholder='패스워드'
          style={styles.radiusInputStyle}
          onChangeText={(password) => this.setState({ password })}
        />
        <TextInput
          ref={(input) => { this.textInputPwdCon = input; }}
          placeholder='패스워드 확인'
          style={styles.radiusInputStyle}
          onChangeText={(pwdConfig) => this.setState({ pwdConfig })}
        />
        <TextInput
          placeholder='닉네임 입력'
          style={styles.radiusInputStyle}
          onChangeText={(name) => this.setState({ name })}
        />
        <Text
          style={{ color: '#e68e95', fontSize: 13, fontWeight: 'bold', marginVertical: 10,}}
        >성별</Text>
        <RadioForm 
          radio_props={sex}
          initial={0}
          labelStyle={{width: 50}}
          buttonColor={'#e68e95'}
          selectedButtonColor={'#e68e95'}
          formHorizontal={true}
          labelHorizontal={true}
          animation={true}
          onPress={(sex) => {this.setState({sex: sex});}}
        />
        <Text
          style={{ color: '#e68e95', fontSize: 13, fontWeight: 'bold', marginTop: 30}}
        >나이</Text>
        <Picker style={{width: 100}}
          onValueChange={ (age) => {
            this.setState({age: age});
          }}
          selectedValue={this.state.age}
        >
          {ageItems}
        </Picker>
        <TouchableOpacity 
          style={styles.colorButtonStyle}
          onPress={() => {
            this.configPwd(this.state);
          }}
        >
          <Text
            style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}
          >회원가입</Text>
        </TouchableOpacity>
      </SectionCol>
    );
  }

  
}