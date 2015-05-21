import React, {Component} from 'react';
import {FlexLayout, Header, Footer, Content} from '../Layout';
import {Panel, PanelLink, PanelHeader} from '../Panels';
import UserStore from '../../stores/UserStore';
import action from '../../actions/AppActionCreator';
import superlog from '../../util/log';
let log = superlog('Shippings');

let getState = () => {
  let user = UserStore.getState();
  return {
    UserStore: user
  };
}

class Shippings extends Component {
  constructor () {
    super();
    this.state = getState();
    this.change = () => this.setState(getState());
    this.handleAction = (e) => {
      this.setState({
        editable: !this.state.editable
      });
    };
  }

  componentDidMount () {
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  static willTransitionTo (transition) {
    let user = UserStore.getState().currentUser;
    if (!(user && user.authenticated())) transition.redirect('/login');
  }

  render () {
    let shippings = this.state.UserStore.currentUser.get('shippings');
    return (
      <FlexLayout>
        <Header back={true} title="運送方式" action={this.handleAction} actionName="編輯"/>
        <Content>
          <PanelHeader>提供的付款條件</PanelHeader>
          <ShippingList shippings={shippings} editable={this.state.editable}/>
        </Content>
        <Footer />
      </FlexLayout>
    );
  }
}

class ShippingList extends Component {
  constructor () {
    super();
    this.deleteFn = (indexOfShipping, e) => {
      action.deleteShipping(indexOfShipping);
    };
    this.renderItems = () => {
      let { editable } = this.props;
      return this.props.shippings.map((shipping, index) => {
        return (
          <PanelLink deleteFn={this.deleteFn.bind(null, index)} editable={editable} key={'shipping-' + index} description={shipping.description}>{shipping.shippingWay}</PanelLink>
        );
      });
    };
  }

  render () {
    return (
      <Panel>
        {this.renderItems()}
        <PanelLink to="/new-shipping">＋新增一個付款方式</PanelLink>
      </Panel>
    );
  }
}

export default Shippings;

