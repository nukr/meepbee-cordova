import React, {Component} from 'react';
import { FlexLayout, Content, Header, Footer } from '../Layout';

import NavTabs from '../Components/NavTabs';
import Tab from '../Components/Tab';
import OrderList from './OrderList';

import styles from './styles';
import UserStore from '../../stores/UserStore';

import {RouteHandler} from 'react-router';
import action from '../../actions/AppActionCreator';

class Order extends Component {
  constructor () {
    super();
    this.state = {
      UserStore: UserStore.getState(),
      tabState: 'seller'
    };
    this.tabClick = (tabName, e) => this.setState({tabState: tabName});
    this.change = () => {
      this.setState({
        UserStore: UserStore.getState()
      });
    };
  }

  static willTransitionTo (transition) {
    let user = UserStore.getState().currentUser;
    if (!(user && user.authenticated())) transition.redirect('/login');
  }

  componentDidMount () {
    action.getOrders();
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }


  render () {
    let {buyer, seller} = this.state.UserStore;
    let tabState = this.state.tabState;
    return (
      <FlexLayout>
        <Header title="訂單" back={true}/>
        <Content>
          <NavTabs>
            <Tab active={tabState === 'seller'} tabName="seller" onTouchTap={this.tabClick}>Sell</Tab>
            <Tab active={tabState === 'buyer'} tabName="buyer" onTouchTap={this.tabClick}>Buy</Tab>
          </NavTabs>
          <OrderList orders={tabState === 'seller' ? seller : buyer}/>
        </Content>
        <Footer />
      </FlexLayout>
    );
  }
}

module.exports = Order;

