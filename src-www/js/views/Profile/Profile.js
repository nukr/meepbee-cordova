import React from 'react';

import UserStore from '../../stores/UserStore';
import FansAndFollowers from './FansAndFollowers';
import ProfileUpper from './ProfileUpper';
import { Panel, PanelLink } from '../Panels';
import { FlexLayout, Content, Header, Footer } from '../Layout';
import Spinner from '../Components/Spinner';
import action from '../../actions/AppActionCreator';
import styles from './styles';
import superlog from '../../util/log';
let log = superlog('log');
let m = Object.assign;

let alert2 = (msg) => {
  if (navigator.notification) {
    navigator.notification.alert(msg);
  } else {
    alert(msg);
  }
};

let getState = () => {
  let me = UserStore.getCurrentUser();
  let fans = 0;
  let follows = 0;
  let userProfile = {};
  if (me) {
    userProfile = UserStore.getUserProfile(me.id);
  }
  let products = userProfile.products || [];

  return {
    user: userProfile.user,
    loading: userProfile.loading,
    name: name,
    fans: userProfile.fans && userProfile.fans.length,
    follows: userProfile.follows && userProfile.follows.length,
    products: products,
  };
};

class Profile extends React.Component {
  constructor (props, context) {
    super();
    this.state = getState();
    this.change = () => this.setState(getState());
    this.handleClick = () => {
      context.router.transitionTo('/edit-personal-data');
    };
    this.log = () => {
      if (this.state.user) {
        action.logout();
        alert2('已成功登出');
      } else {
        context.router.transitionTo('/login');
      }
    };
    this.takePicture = () => {
      let cameraSuccess = (imageData) => {
        action.saveImage('data:image/png;base64,' + imageData, 4);
        context.router.transitionTo('/image-crop');
      };
      let cameraError = () => {
      };
      let cameraOptions = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.PNG,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 960,
        targetHeight: 960
      };
      navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
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

  componentDidMount () {
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  render () {
    let {avatarImage, fans, follows, user} = this.state;

    return (
      <FlexLayout>
        <Header title="簡介" back={true}/>
        <Content>
          <ProfileUpper user={user} fans={fans} follows={follows}/>
          <Panel>
            <PanelLink to="/payments">付款方式</PanelLink>
            <PanelLink to="/shippings">運送方式</PanelLink>
          </Panel>

          <Panel>
            <PanelLink to="/order">訂單</PanelLink>
            <PanelLink to="/sale-by-me">販售的商品</PanelLink>
            {
              // <PanelLink to="/bought">購買過的商品</PanelLink>
            }
          </Panel>

          <Panel>
            <PanelLink to="/activity">動態</PanelLink>
            <PanelLink to="/liked">說讚的</PanelLink>
          </Panel>

          <Panel>
            <PanelLink onTouchTap={this.log}>{user ? '登出' : '登入'}</PanelLink>
          </Panel>
          <Spinner display={this.state.loading} message="讀取中"/>
        </Content>
        <Footer active="profile" />
      </FlexLayout>
    );
  }
}

module.exports = Profile;

