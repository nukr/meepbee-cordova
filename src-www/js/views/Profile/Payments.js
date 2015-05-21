import React, {Component} from 'react';
import {FlexLayout, Header, Footer, Content} from '../Layout';
import {Panel, PanelLink, PanelHeader} from '../Panels';
import UserStore from '../../stores/UserStore';
import action from '../../actions/AppActionCreator';
import superlog from '../../util/log';
let log = superlog('Payments');

let getState = () => {
  let user = UserStore.getState();
  return {
    UserStore: user
  };
}

class Payments extends Component {
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
    let payments = this.state.UserStore.currentUser.get('payments');
    return (
      <FlexLayout>
        <Header back={true} title="付款方式" action={this.handleAction} actionName={this.state.editable ? '完成' : '編輯'}/>
        <Content>
          <PanelHeader>提供的付款條件</PanelHeader>
          <PaymentList payments={payments} editable={this.state.editable}/>
        </Content>
        <Footer />
      </FlexLayout>
    );
  }
}

class PaymentList extends Component {
  constructor () {
    super();
    this.deleteFn = (indexOfPayment, e) => {
      action.deletePayment(indexOfPayment);
    };
    this.renderItems = () => {
      let { editable } = this.props;
      return this.props.payments.map((payment, index) => {
        return (
          <PanelLink deleteFn={this.deleteFn.bind(null, index)} editable={editable} key={'payment-' + index} description={payment.description}>{payment.tradingWay}</PanelLink>
        );
      });
    };
  }

  render () {
    return (
      <Panel>
        {this.renderItems()}
        <PanelLink to="/new-payment">＋新增一個付款方式</PanelLink>
      </Panel>
    );
  }
}

export default Payments;

