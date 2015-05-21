import React, {Component} from 'react';
import {FlexLayout, Header, Content, Footer} from '../Layout';
import {Panel, PanelCheckBox, PanelLink} from '../Panels';
import UserStore from '../../stores/UserStore';

class ShippingSelect extends Component {
  constructor (props, context) {
    super();
    this.state = {
      UserStore: UserStore.getState()
    };

    this.handleClick = (shipping, e) => {
      shipping.selected = !shipping.selected;
      this.forceUpdate();
    };

    this.confirm = () => {
      if (!context.router.goBack()) {
        context.router.transitionTo('/');
      }
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  static willTransitionTo (transition) {
    let user = UserStore.getState().currentUser;
    if (!(user && user.authenticated())) transition.redirect('/login');
  }

  render () {
    let shippings = this.state.UserStore.currentUser.get('shippings');
    let checkboxes = shippings.map((shipping, index) => {
      return (
        <PanelCheckBox
          key={'shipping-' + index}
          name="shippings"
          value={shipping.shippingWay}
          checked={shipping.selected}
          onTouchTap={this.handleClick.bind(null, shipping)} />
      );
    });
    return (
      <FlexLayout>
        <Header title="運送方式" back={true} action={this.confirm} icon="check"/>
        <Content>
          <Panel>
            {checkboxes}
            <PanelLink to="/new-shipping">＋新增一個運送方式</PanelLink>
          </Panel>
        </Content>
        <Footer active="sell" />
      </FlexLayout>
    );
  }
}

export default ShippingSelect;

