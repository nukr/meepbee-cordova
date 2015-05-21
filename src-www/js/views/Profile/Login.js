import React from 'react';
import UserStore from '../../stores/UserStore';
import action from '../../actions/AppActionCreator';
import styles from './styles';
import {Panel, PanelInput, PanelLink, PanelHeader, PanelTextArea} from '../Panels';
import {FlexLayout, Header, Footer, Content} from '../Layout';
import Spinner from '../Components/Spinner';
let m = Object.assign;
import superlog from '../../util/log';
let log = superlog('Login.react');

class Login extends React.Component {
  constructor (props, context) {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.change = this.change.bind(this);
    this.login = this.login.bind(this);
    this.signup = () => {
      context.router.transitionTo('/signup');
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  static willTransitionTo (transition) {
    let user = UserStore.getCurrentUser();
    if (user && user.authenticated()) {
      transition.redirect('/profile');
    }
  }

  handleChange (e) {
    if (typeof this.state.form === 'undefined') this.state.form = {};
    this.state.form[e.target.name] = e.target.value;
  }

  change () {
    this.setState(UserStore.getState());
  }

  componentDidMount () {
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  login () {
    action.login(this.state.form);
  }

  render () {
    if (this.state.currentUser && this.state.currentUser.authenticated()) this.context.router.transitionTo('/profile');
    return (
      <FlexLayout>
        <Header title="登入" back={true} action={this.login} actionName="登入" />
        <Content>
          <Panel>
            <PanelInput name='username' onChange={this.handleChange} placeholder="電子信箱" />
            <PanelInput type='password' name='password' onChange={this.handleChange} placeholder="密碼" />
          </Panel>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', color: 'lightgray'}}>忘記密碼？</div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', color: 'lightgray'}}>還沒有帳號嗎？<b onTouchTap={this.signup}>馬上註冊！</b></div>
          <div style={m(
            styles.hide,
            styles.error,
            this.state.err && styles.flexAllCenter
          )}>帳號或密碼錯誤</div>
          <Spinner display={this.state.loggingIn} message="登入中"/>
        </Content>
        <Footer />
      </FlexLayout>
    );
  }
}

export default Login;

