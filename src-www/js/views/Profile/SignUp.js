import React, {Component} from 'react';
import UserStore from '../../stores/UserStore';
import { FlexLayout, Content, Header, Footer } from '../Layout';
import {Panel, PanelInput, PanelLink, PanelHeader, PanelTextArea} from '../Panels';
import Spinner from '../Components/Spinner';
import styles from './styles';
import action from '../../actions//AppActionCreator';

class SignUp extends Component {
  constructor (props, context) {
    super();
    this.state = {
      signingUp: UserStore.getState().signUpStatus.signingUp,
      status: UserStore.getState().signUpStatus.status,
      error: UserStore.getState().signUpStatus.reason,
      form: {}
    };
    this.signup = () => {
      let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      let mobileRE = /^\d{10}$/;
      if (!re.test(this.state.form.email)) {
        this.setState({
          error: 'Email格式錯誤'
        });
      } else if (!mobileRE.test(this.state.form.mobile)) {
        this.setState({
          error: '電話格式錯誤'
        });
      } else if (!this.state.form.password || this.state.form.password.length < 8) {
        this.setState({
          error: '密碼長度必須大於等於8'
        });
      } else {
        action.signup(this.state.form);
      }
    };
    this.handleChange = (e) => {
      this.state.form[e.target.name] = e.target.value;
    };
    this.change = () => {
      this.setState({
        signingUp: UserStore.getState().signUpStatus.signingUp,
        status: UserStore.getState().signUpStatus.status,
        error: UserStore.getState().signUpStatus.reason
      });
    };
  }

  static willTransitionTo (transition) {
    let user = UserStore.getCurrentUser();
    if (user && user.authenticated()) {
      transition.redirect('/profile');
    }
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.status === 'success') {
      this.context.router.transitionTo('/profile');
    }
  }

  componentDidMount () {
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  render () {
    return (
      <FlexLayout>
        <Header title="註冊" back={true} action={this.signup} actionName="註冊"/>
        <Content>
          <Panel>
            <PanelInput type="email" name='email' onChange={this.handleChange} placeholder="電子信箱" />
            <PanelInput type="number" name='mobile' onChange={this.handleChange} placeholder="手機號碼" />
            <PanelInput type='password' name='password' onChange={this.handleChange} placeholder="密碼" />
          </Panel>
          <div style={{display: 'flex', justifyContent: 'center', color: 'lightgray', fontSize: '0.8em'}}>確定註冊後，您同意meepBee的</div>
          <div style={{display: 'flex', justifyContent: 'center', color: 'lightgray', fontSize: '0.8em'}}>
            <span>服務條款</span>
            和
            <span>隱私設定</span>
          </div>
          {this.state.error && <div style={{display: 'flex', justifyContent: 'center', color: 'red'}}>{this.state.error}</div>}
          <Spinner display={this.state.signingUp} message="註冊中"/>
        </Content>
        <Footer/>
      </FlexLayout>
    );
  }
}

export default SignUp;
