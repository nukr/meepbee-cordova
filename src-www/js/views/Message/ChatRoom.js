import React, {Component} from 'react';
import { Header, Footer, Content, FlexLayout } from '../Layout';
import action from '../../actions/AppActionCreator';
import UserStore from '../../stores/UserStore';
import styles from './styles';
let m = Object.assign;

let getChat = (id) => {
  let chat = UserStore.getChat(id);
  console.log(chat);
};

class ChatRoom extends Component {
  constructor (props, context) {
    super();
    getChat(context.router.getCurrentParams().chatRoomId);
    this.state = {
      unsendMsg: '',
      chats: UserStore.getCurrentChat(context.router.getCurrentParams().chatRoomId) || [],
      message: UserStore.getCurrentMessage(context.router.getCurrentParams().chatRoomId),
      me: UserStore.getCurrentUser()
    };
    this.change = () => this.setState({
      chats: UserStore.getCurrentChat(context.router.getCurrentParams().chatRoomId),
      message: UserStore.getCurrentMessage(context.router.getCurrentParams().chatRoomId),
      me: UserStore.getCurrentUser()
    });
    this.input = (e) => {
      this.setState({unsendMsg: e.target.value});
    };
    this.send = (e) => {
      let message = this.state.message;
      let me = this.state.me;
      let oppo;
      if (message.get('buyer').id === me.id) {
        oppo = this.state.message.get('seller');
      } else {
        oppo = this.state.message.get('buyer');
      }
      if (this.state.unsendMsg.length !== 0) {
        action.sendMsg(this.context.router.getCurrentParams().chatRoomId, this.state.unsendMsg, oppo);
        this.state.unsendMsg = '';
        this.refs.chatInput.getDOMNode().value = '';
      }
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  componentDidUpdate () {
    let content = React.findDOMNode(this.refs.content);
    content.scrollTop = content.scrollHeight;
  }

  componentDidMount () {
    action.getChat(this.context.router.getCurrentParams().chatRoomId);
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  render () {
    let chats = this.state.chats;
    let message = this.state.message;
    let product = message.get('product');
    let order = message.get('order');

    let imgSrc;
    if (product) {
      imgSrc = product.get('thumbnailImages')[0].url();
    } else {
      imgSrc = order.get('orderForm').productImageURL;
    }

    let title;
    if (product) {
      title = product.get('title');
    } else {
      title = order.get('orderForm').realName + order.id;
    }

    let price;
    if (product) {
      price = product.get('price');
    } else {
      price = order.get('orderForm').pricePerProduct;
    }

    let productTitle;
    if (product) {
      productTitle = product.get('title');
    } else {
      productTitle = order.get('orderForm').title;
    }

    let me = this.state.me;
    return (
      <FlexLayout>
        <Header title={title} back={true}/>
        <Content ref="content">
          <div style={{display: 'flex', backgroundColor: 'lightgray'}}>
            <div><img src={imgSrc} width="64px" height="64px"/></div>
            <div style={{display: 'flex', flex: 1, alignItems: 'center'}}>{productTitle}</div>
            <div style={{display: 'flex', alignItems: 'center'}}>{price}</div>
          </div>
          <div style={{display: 'flex', flexFlow: 'column', padding: '10px'}}>
            {chats.map((chat, index) => {
              return (
                <ChatBubble chat={chat} key={`chat-${index}`} me={this.state.me}/>
              );
            })}
          </div>
        </Content>
        <div style={styles.inputBoxWrapper}>
          <input ref="chatInput" onChange={this.input} style={styles.inputBox} type="text" placeholder="新訊息"/>
          <div onTouchTap={this.send} style={m({},
            styles.sendBtn,
            this.state.unsendMsg.length > 0 && {color: 'white'})}>
            傳送
          </div>
        </div>
      </FlexLayout>
    );
  }
}

class ChatBubble extends Component {
  render () {
    let chat = this.props.chat;
    let user = chat.get('user');
    let isMe = user.id === this.props.me.id;
    return (
      <div style={m(
        {},
        styles.chatBubbleWrapper,
        isMe && styles.pullRight
      )}>
        {
          isMe
          || (
            <div>
              <img width="24px" height="24px" src={user.get('avatarImage') ? user.get('avatarImage').url() : require('../../../assets/elements/img_avatar_nophoto.png')}/>
            </div>
          )
        }
        <div style={m(
          {},
          styles.chatBubble,
          isMe && {backgroundColor: '#0ed8ab'}
        )}>
          {chat.get('text')}
        </div>
      </div>
    );
  }
}

export default ChatRoom;
