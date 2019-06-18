import React, { Component } from 'react';
import { 
  FlatList, 
  Platform,
  TouchableOpacity
} from 'react-native';
import { observer, inject } from 'mobx-react';
import apiService from '../services/ApiService';
import MsgItem from '../components/MsgItem';
import _ from 'lodash';


const MsgListItem = observer(({user, onPress}) => {
  return (
    <TouchableOpacity onPress={() => {
      onPress(user);
    }}>
      <MsgItem user={user} chevron={true}/>
    </TouchableOpacity>
  );
});


@inject('store')
@observer
class MsgListScreen extends Component {
  static navigationOptions = {
    title: 'Chat',
  };

  state = {
    name: '',
  };
  constructor(props) {
    super(props);
    this.store = this.props.store.users;
    this.state = {
      refreshing: false,
      list: []
    };
    apiService.setNavigation(this.props.navigation);
  }
  componentDidMount() {
    this.setState({ refreshing: true }, () => {
      //This code will showing the refresh indicator
      if (Platform.OS === 'ios')
        this.listRef && this.listRef.scrollToOffset({ offset: -65, animated: true });
    });

    this.fetch();
  }
  async fetch() {
    try {
      const resp = [{id: 1 , email:'asdf', name:'asdf', avatar:'asff'}, {id: 2 , email:'asdf', name:'asdf', avatar:'asff'}, {id: 3 , email:'asdf', name:'asdf', avatar:'asff'}, {id: 4 , email:'asdf', name:'asdf', avatar:'asff'}, {id: 5 , email:'asdf', name:'asdf', avatar:'asff'}, {id: 6 , email:'asdf', name:'asdf', avatar:'asff'}];
      // const resp = await apiService.getUsers();
      const list = this.store.put(resp);
      // const list = this.store.put(resp.data);
      
      this.setState({
        refreshing: false,
        list
      });
    } catch(e) {
      this.setState({refreshing: false});
    }
  }
  render() {
    return (
      <FlatList 
        data={this.state.list}
        keyExtractor={(item)=> `${item}`}
        renderItem={({item}) => { return (
          <MsgListItem 
            user={this.store.getItem(item)}
            onPress={(user)=>
              this.props.navigation.navigate('Msg', { name: user.name })
            }
          />
        );}}
        onRefresh={() => {this.fetch();}}
        refreshing={this.state.refreshing}
      />
    );
  }

}

export default MsgListScreen;



