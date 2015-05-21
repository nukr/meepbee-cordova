import React from 'react';
import {FlexLayout, Header, Footer, Content} from './Layout';
import {Panel, PanelHeader, PanelInput} from './Panels';
import action from '../actions/AppActionCreator';

class NewShipping extends React.Component {
  constructor (props, context) {
    super();
    this.state = {selected: false};
    this.confirm = () => {
      action.newShipping(this.state);
      context.router.goBack();
    };
    this.handleChange = (e) => {
      if (e.target.name === "fee") {
        this.state[e.target.name] = parseInt(e.target.value ,10);
      } else {
        this.state[e.target.name] = e.target.value;
      }
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
        <Header back={true} title="新增一個運送方式" action={this.confirm}/>
        <Content>
          <PanelHeader>運送方式</PanelHeader>
          <Panel>
            <PanelInput placeholder="例如：宅配" name="shippingWay" onChange={this.handleChange} />
          </Panel>
          <PanelHeader>運送費用</PanelHeader>
          <Panel>
            <PanelInput placeholder="0" name="fee" onChange={this.handleChange} />
          </Panel>
        </Content>
        <Footer />
      </FlexLayout>
    );
  }
}

export default NewShipping;

