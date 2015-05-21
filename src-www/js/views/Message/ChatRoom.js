import React, {Component} from 'react';
import { Header, Footer, Content, FlexLayout } from '../Layout';
import Spinner from '../Components/Spinner';
import action from '../../actions/AppActionCreator';
import UserStore from '../../stores/UserStore';
import styles from './styles';
import superlog from '../../util/log';
let log = superlog('ChatRoom');
let m = Object.assign;

let getState = (chatRoomId) => {
  let {product, chats, loading} = UserStore.getChat(chatRoomId);
  let me = UserStore.getCurrentUser();

  return {
    chats: chats,
    product: product,
    me: me,
    loading: loading
  }
}

class ChatRoom extends Component {
  constructor (props, context) {
    super();
    let chatRoomId = context.router.getCurrentParams().chatRoomId
    this.state = getState(chatRoomId);
    this.state.unsendMsg = '';
    this.change = () => this.setState(getState(chatRoomId));
    this.input = (e) => this.setState({unsendMsg: e.target.value});
    this.send = (e) => {
      if (this.state.unsendMsg.length !== 0) {
        action.sendMsg(chatRoomId, this.state.unsendMsg, this.state.product);
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
    let {chats, product} = this.state
    if (this.state.loading) {
      return <Spinner display={true} message="讀取中"/>
    }
    return (
      <FlexLayout>
        <Header title={product.get('title')} back={true}/>
        <Content ref="content">
          <Product product={product}/>
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
class Product extends Component {
  render () {
    let product = this.props.product;
    let imgSrc = product.get('thumbnailImages')[0].url();
    let title = product.get('title');
    let price = product.get('price');
    let productTitle = product.get('title');
    return (
      <div style={{display: 'flex', backgroundColor: 'lightgray'}}>
        <div><img src={imgSrc} width="64px" height="64px"/></div>
        <div style={{display: 'flex', flex: 1, alignItems: 'center'}}>{productTitle}</div>
        <div style={{display: 'flex', alignItems: 'center'}}>{price}</div>
      </div>
    )
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
