import React, {Component} from 'react';
import { Header, Footer, Content, FlexLayout } from '../Layout';
import styles from './styles';
import action from '../../actions/AppActionCreator';
import UserStore from '../../stores/UserStore';

import superlog from '../../util/log';
let log = superlog('Message');

class Message extends Component {
  constructor (props, context) {
    super();
    this.state = {
      UserStore: UserStore.getState(),
      messages: UserStore.getState().messages,
      orderMessages: UserStore.getState().orderMessages
    };
    this.change = () => this.setState({
      UserStore: UserStore.getState(),
      messages: UserStore.getState().messages,
      orderMessages: UserStore.getState().orderMessages
    });
    this.handleClick = (message, e) => {
      context.router.transitionTo(`/chatroom/${message.get('chatRoomId')}`);
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
    action.getMessage();
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  renderMessages (messages) {
    if (messages) {
      return (
        <div style={{display: 'flex', flex: 1, flexFlow: 'column'}}>
          {messages.map((message, index) => <MessageList message={message} key={`message-list-${index}`} onTouchTap={this.handleClick}/>)}
        </div>
      );
    } else {
      return (
        <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>沒有任何訊息</div>
      );
    }
  }

  renderOrderMessages (messages) {
    if (messages) {
      return (
        <div style={{display: 'flex', flex: 1, flexFlow: 'column'}}>
          {messages.map((message, index) => <MessageList message={message} key={`message-list-${index}`} onTouchTap={this.handleClick}/>)}
        </div>
      );
    } else {
      return (
        <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>沒有任何訊息</div>
      );
    }
  }

  render () {
    let messages = this.state.messages;
    let orderMessages = this.state.orderMessages;
    return (
      <FlexLayout>
        <Header title="訊息" />
        <Content>
          {this.renderMessages(messages)}
          {this.renderOrderMessages(orderMessages)}
        </Content>
        <Footer active="message" />
      </FlexLayout>
    );
  }
}

class MessageList extends Component {
  render () {
    let message = this.props.message;
    let lastUser = message.get('lastUser');
    let seller = this.props.message.get('seller');
    let avatarImage = lastUser.get('avatarImage');
    let productImage = message.get('product') && message.get('product').get('thumbnailImages')[0];
    let orderImage = message.get('order') && message.get('order').get('orderForm').productImageURL;
    return (
      <div style={{height: '64px', borderBottom: '1px solid lightgray', display: 'flex'}} onTouchTap={this.props.onTouchTap.bind(null, message)}>
        <div style={{width: '64px'}}>
          <img src={avatarImage ? avatarImage.url() : require('../../../assets/elements/img_avatar_nophoto.png')} width="64px" height="64px"/>
        </div>

        <div style={{flex: 1, display: 'flex', flexFlow: 'column', justifyContent: 'space-around'}}>
          <div style={{color: '#0ed8ab'}}>{lastUser.get('name')}</div>
          <div>{message.get('lastMessage')}</div>
        </div>

        <div style={{width: '64px'}}>
          <img src={orderImage || productImage && productImage.url()} width="64" height="64"/>
        </div>
      </div>
    );
  }
}

export default Message;

