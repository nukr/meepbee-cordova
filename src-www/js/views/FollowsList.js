import React, {Component} from 'react';
import {Header, Content, Footer, FlexLayout} from '../views/Layout';
import UserList from './UserList.react';
import UserStore from '../stores/UserStore';
import Spinner from './Components/Spinner';

let getState = (id) => {
  let {follows, loading} = UserStore.getFollows(id);
  return {
    loading: loading,
    follows: follows || []
  }
}

class FollowsList extends Component {
  constructor (props, context) {
    let id = context.router.getCurrentParams().userId;
    super();
    this.state = getState(id);
    this.change = () => this.setState(getState(id));
  }
  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }
  componentDidMount () {
    UserStore.addChangeListener(this.change);
  }
  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }
  render () {
    return (
      <FlexLayout>
        <Header title="追蹤名單" back={true}/>
        <Content>
          <UserList users={this.state.follows}/>
          <Spinner display={this.state.loading} message="讀取中"/>
        </Content>
        <Footer/>
      </FlexLayout>
    );
  }
}

export default FollowsList;
