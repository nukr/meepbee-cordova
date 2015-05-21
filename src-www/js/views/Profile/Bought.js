import React from 'react';
import UserStore from '../../stores/UserStore';
import { FlexLayout, Content, Header, Footer } from '../Layout';

class Bought extends React.Component {
  constructor () {
    super();
  }

  static willTransitionTo (transition) {
    let user = UserStore.getState().currentUser;
    if (!(user && user.authenticated())) transition.redirect('/login');
  }

  render () {
    return (
      <FlexLayout>
        <Header title="購買過的東西" back={true} />
        <Content></Content>
        <Footer active="profile"/>
      </FlexLayout>
    );
  }
}

export default Bought;

