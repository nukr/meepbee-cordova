import React from 'react';
import UserStore from '../../stores/UserStore';
import {FlexLayout, Header, Content, Footer} from '../Layout';
import {Panel, PanelInput} from '../Panels';

class EditPersonalData extends React.Component {
  constructor (props) {
    super();
    this.state = {
      UserStore: UserStore.getState()
    };
    this.change = this.change.bind(this);
  }

  static willTransitionTo (transition) {
    let user = UserStore.getState().currentUser;
    if (!(user && user.authenticated())) transition.redirect('/login');
  }

  componentDidMount () {
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  change () {
    this.setState({
      userData: UserStore.getState()
    });
  }

  render () {
    let user = this.state.UserStore.currentUser;
    if (user) {
      return (
        <FlexLayout>
          <Header title="編輯個人資料"/>
          <Content>

            <Panel>
              <PanelInput title="商店名稱" defaultValue={user.get('name')} placeholder="足球配件專賣" />
              <PanelInput title="國家/城市" defaultValue={user.get('country')} placeholder="新北市永和" />
              <PanelInput title="商店描述" defaultValue={user.get('personalDescription')} placeholder="足球配備、手工藝品..." />
            </Panel>

            <Panel>
              <PanelInput title="使用者名稱" defaultValue={user.get('username')} disabled/>
              <PanelInput title="電子信箱" defaultValue={user.get('email')} disabled/>
              <PanelInput title="密碼" />
            </Panel>

          </Content>
          <Footer />
        </FlexLayout>
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }
}

export default EditPersonalData


