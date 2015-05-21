import React, {Component} from 'react';
import { Header, Footer, Content, FlexLayout } from '../Layout';
import styles from './styles';
import action from '../../actions/AppActionCreator';
import UserStore from '../../stores/UserStore';
import Spinner from '../Components/Spinner';

let getState = () => {
  let { users, loading } = UserStore.getAllUsers();
  return {
    loading: loading,
    users: users
  }
}
class Chat extends Component {
  constructor () {
    super();
    this.state = getState();
    this.change = () => this.setState(getState());
  }

  componentDidMount () {
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  render () {
    let {users} = this.state;
    return (
      <FlexLayout>
        <Header title="訊息" />
        <Content>
          <div style={{display: 'flex', flexFlow: 'row wrap'}}>
            {users.map((user, index) => <User user={user} key={user.id}/>)}
          </div>
          <Spinner display={this.state.loading} message="讀取中"/>
        </Content>
        <Footer active="message" />
      </FlexLayout>
    );
  }
}

class User extends Component {
  constructor () {
    super();
    this.handleClick = (e) => {
      console.log('click');
      action.cloudtest();
    };
  }
  render () {
    let {user} = this.props;
    return (
      <div onTouchTap={this.handleClick} style={{display: 'flex', flexFlow: 'column', borderBottom: '1px solid lightgray'}}>
        <img src={user.get('avatarImage').url()} alt="avatarImage" style={{width: '33vw'}}/>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{user.get('username')}</div>
      </div>
    );
  }
}

export default Chat;

