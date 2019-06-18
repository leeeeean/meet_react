import axios from 'axios';
import { Alert } from 'react-native';

// baseURL 및 기본 설정들을 위해서 별도의 client 생성
const client = axios.create({
  // 이 아래 서버 주소를 본인의 프로젝트에 맞게 수정해야 함!
  // 뒤에 api 가 붙어있는 상태..
  baseURL: 'http://192.168.0.6:3000/my',
  headers: { 'x-app-version': '0.0.1', 'x-appname': 'meet You' }
});

client.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Default Error Handler
  if (error.response) {
    //  200 이외의 response code가 넘어오는 경우
    if (error.response.status == 401) {
      // Unauthorize
      client.navigation.navigate('Auth');
    } else if (error.response.status == 500) {
      // 
      Alert.alert(
        '일시적으로 서비스를 이용할 수 없습니다.',
        '잠시 후 다시 이용해주세요.',
        [
          { text: 'OK', onPress: () => { } },
        ],
        { cancelable: false },
      );
    }
    return Promise.reject(error.response);
  } else if (error.request) {
    // 아예 response를 받지 못하는 경우
    Alert.alert(
      'Network Error',
      '네트워크 연결상태를 확인하고, 다시 시도해주세요.',
      [
        { text: 'OK', onPress: () => {} },
      ],
      { cancelable: false },
    );

  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  // console.error(error.config);
  return Promise.reject(error);
});


class ApiService {
  setNavigation(navigation) {
    client.navigation = navigation;
  }

  signin(data) {
    return client.post('/signin', {data: data});
  }
  configID(data) {
    return client.post('/configID', {data: data});
  }

  setToken(token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
  signinInfo(){
    return client.post('/signin/info');
  }
  login(data) {
    return client.post('/login', {data: data});
  }

  // getUsers() {
  //   return client.get('/users');
  // }

  getUser(id) {
    return client.get(`/users/${id}`);
  }

  getList(userId) {
    if (userId) {
      return client.get(`/users/${userId}/list`);
    } else {
      return client.get('/sensor_groups');
    }
  }

  getListUser(id) {
    return client.get(`/list/${id}`);
  }

  // getSensors(sensorGroupId, config) {
  //   if (sensorGroupId || sensorGroupId === 0) {
  //     return client.get(`/sensor_groups/${sensorGroupId}/sensors`, config);
  //   } else {
  //     return client.get('/sensors', config);
  //   }
  // }

  // getSensor(id) {
  //   return client.get(`/sensors/${id}`);
  // }

  // getValues(sensorId) {
  //   return client.get(`/sensors/${sensorId}/values`);
  // }

  
}

export default new ApiService();