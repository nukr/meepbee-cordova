import React, {Component} from 'react';
import {Header, Content, Footer, FlexLayout} from '../views/Layout';
import UserList from './UserList.react';
import UserStore from '../stores/UserStore';
import Spinner from './Components/Spinner';

let getState = (id) => {
  let {fans, loading} = UserStore.getFans(id);
  return {
    loading: loading,
    fans: fans || []
  }
}

class FansList extends Component {
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
        <Header title="粉絲名單" back={true}/>
        <Content>
          <UserList users={this.state.fans}/>
          <Spinner display={this.state.loading} message="讀取中"/>
        </Content>
        <Footer/>
      </FlexLayout>
    );
  }
}

export default FansList;
