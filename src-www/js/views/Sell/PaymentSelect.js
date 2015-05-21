import React, {Component} from 'react';
import {FlexLayout, Header, Content, Footer} from '../Layout';
import {Panel, PanelCheckBox, PanelLink} from '../Panels';
import UserStore from '../../stores/UserStore';

class PaymentMethod extends Component {
  constructor (props, context) {
    super();
    this.state = {
      UserStore: UserStore.getState()
    };

    this.handleClick = (payment, e) => {
      payment.selected = !payment.selected;
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
    let payments = this.state.UserStore.currentUser.get('payments');
    let checkboxes = payments.map((payment, index) => {
      return (
        <PanelCheckBox
          key={'payment-' + index}
          name="payments"
          value={payment.tradingWay}
          checked={payment.selected}
          onTouchTap={this.handleClick.bind(null, payment)} />
      );
    });
    return (
      <FlexLayout>
        <Header title="付款方式" back={true} action={this.confirm} icon="check"/>
        <Content>
          <Panel>
            {checkboxes}
            <PanelLink to="/new-payment">＋新增一個付款方式</PanelLink>
          </Panel>
        </Content>
        <Footer active="sell" />
      </FlexLayout>
    );
  }
}

export default PaymentMethod;
