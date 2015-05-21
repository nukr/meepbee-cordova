import React, {Component} from 'react';
import FansAndFollowers from './FansAndFollowers';
import styles from './styles';
let m = Object.assign;

class ProfileUpper extends Component {
  constructor (props, context) {
    super();
    this.fansFn = (id) => {
      if (id) {
        context.router.transitionTo(`/fans-list/${id}`)
      }
    }
    this.followsFn = (id) => {
      if (id) {
        context.router.transitionTo(`/follows-list/${id}`)
      }
    }
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  static get propTypes () {
    return {
      fans: React.PropTypes.number,
      follows: React.PropTypes.number,
      isFollowed: React.PropTypes.bool,
      user: React.PropTypes.any
    };
  }
  render () {
    let {fans, follows, isFollowed, user} = this.props;
    let avatarImage;
    if (user && user.get('avatarImage')) {
      avatarImage = <img src={user.get('avatarImage').url()} style={{borderRadius: '50px'}}/>;
    } else if (user) {
      avatarImage = <img src={require('../../../assets/elements/img_avatar_takephoto.png')}/>;
    } else {
      avatarImage = <img src={require('../../../assets/elements/img_avatar_nophoto.png')}/>;
    }
    return (
      <div style={styles.user}>
        <div style={styles.avatar}>
          {avatarImage}
        </div>
        <div style={{marginTop: '30px'}}>{user && user.get('name')}</div>
        <div onTouchTap={this.props.btnAction} style={m({}, styles.editBtn, isFollowed && styles.followed)}>{isFollowed ? <i className="fa fa-check">已追蹤</i> : <i className="fa fa-plus">追蹤</i>}</div>
        <FansAndFollowers
          fans={fans}
          follows={follows}
          fansFn={this.fansFn.bind(null, user && user.id)}
          followsFn={this.followsFn.bind(null, user && user.id)}
        />
      </div>
    );
  }
}

export default ProfileUpper;
