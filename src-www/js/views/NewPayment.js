import React from 'react';
import {FlexLayout, Header, Footer, Content} from './Layout';
import {Panel, PanelHeader, PanelInput} from './Panels';
import action from '../actions/AppActionCreator';

class NewPayment extends React.Component {
  constructor (props, context) {
    super();
    this.state = {selected: false};
    this.confirm = () => {
      action.newPayment(this.state);
      context.router.goBack();
    };
    this.handleChange = (e) => {
      this.state[e.target.name] = e.target.value;
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    return (
      <FlexLayout>
        <Header back={true} title="新增一個付款方式" action={this.confirm} actionName="新增"/>
        <Content>
          <PanelHeader>交易方式</PanelHeader>
          <Panel>
            <PanelInput placeholder="例如：面交、ATM轉帳" name="tradingWay" onChange={this.handleChange}/>
          </Panel>
          <PanelHeader>Payment Detail</PanelHeader>
          <Panel>
            <PanelInput placeholder="描述" name="description" onChange={this.handleChange}/>
          </Panel>
        </Content>
        <Footer />
      </FlexLayout>
    );
  }
}

export default NewPayment;

