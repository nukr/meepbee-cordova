import React, {Component} from 'react';
import ProfileUpper from './ProfileUpper';
import ProfileProducts from './ProfileProducts';
import Spinner from '../Components/Spinner';
import { FlexLayout, Content, Header, Footer } from '../Layout';
import UserStore from '../../stores/UserStore';
import action from '../../actions/AppActionCreator';

let getState = (userId) => {
  let userProfile = UserStore.getUserProfile(userId);
  let fans = 0, follows = 0;
  let products = userProfile.products || [];
  return {
    user: userProfile.user,
    loading: userProfile.loading,
    fans: fans,
    follows: follows,
    products: products,
    isFollowed: userProfile.isFollowed
  };
};

class UserProfile extends Component {
  constructor (props, context) {
    super();
    this.state = getState(context.router.getCurrentParams().userId);
    this.change = () => this.setState(getState(context.router.getCurrentParams().userId));
    this.toggleFollow = () => {
      action.toggleFollow(this.state.user);
    };
  }

  componentDidMount () {
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    let {fans, follows, isFollowed, products, user} = this.state;
    return (
      <FlexLayout>
        <Header title="簡介" back={true}/>
        <Content>
          <ProfileUpper btnAction={this.toggleFollow} user={user} fans={fans} follows={follows} isFollowed={isFollowed}/>
          <ProfileProducts products={products}/>
          <Spinner display={this.state.loading} message="讀取中"/>
        </Content>
      </FlexLayout>
    );
  }
}

export default UserProfile;
