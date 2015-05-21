import React, {Component} from 'react';
import AvatarImage from './Components/AvatarImage.react';
import superlog from '../util/log';
import globalStyles from './styles';
let log = superlog('UserList');


class UserList extends Component {

  constructor (props, context) {
    super();
    this.toUserProfile = (user) => {
      context.router.transitionTo(`/user-profile/${user.id}`)
    }
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  static get propTypes () {
    return {
      users: React.PropTypes.array
    };
  }

  render () {
    return (
      <div>
        {
          this.props.users.map(user => {
            return <UserListItem toUserProfile={this.toUserProfile.bind(null, user)} key={user.id} user={user}/>
          })
        }
      </div>
    )
  }
}

class UserListItem extends Component {
  render () {
    let {user} = this.props;
    return (
      <div style={{height: '48px', display: 'flex', alignItems: 'center'}} onTouchTap={this.props.toUserProfile}>
        <AvatarImage width="24px" url={user.get('avatarImage') && user.get('avatarImage').url()}/>
        <div style={{flex: 1, color: globalStyles.meepbeeColor, marginLeft: '5px'}}>{user.get('name')}</div>
        <div style={{color: globalStyles.meepbeeColor, fontSize: '0.8em'}}>1 個商品</div>
      </div>
    );
  }
}

export default UserList;
