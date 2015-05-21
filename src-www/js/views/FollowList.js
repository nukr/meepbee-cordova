import React, {Component} from 'react';
import {Header, Content, Footer, FlexLayout} from '../views/Layout';

class FollowList extends Component {
  render () {
    return (
      <FlexLayout>
        <Header title="追蹤名單"/>
        <Content>
          <UserListItem />
        </Content>
        <Footer/>
      </FlexLayout>
    );
  }
}

class UserListItem extends Component {
  render () {
    return (
      <div style={{height: '48px'}}>
        Hihi
      </div>
    );
  }
}

export default FollowList;
