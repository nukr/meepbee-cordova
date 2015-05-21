import React, {Component} from 'react';
import {FlexLayout, Header, Footer, Content} from './Layout';
import MessageInputBox from './Components/MessageInputBox.react';
import ChatBubble from './Components/ChatBubble.react';
import Spinner from './Components/Spinner';
import ProductStore from '../stores/ProductStore';
import AvatarImage from './Components/AvatarImage.react';
import action from '../actions/AppActionCreator';
import moment from 'moment';

import superlog from '../util/log';
let log = superlog('Comments');


let getState = (id) => {
  let { comments, loading } = ProductStore.getComments(id);
  return {
    loading: loading,
    comments: comments || []
  }
}
class CommentBox extends Component {
  constructor (props, context) {
    let id = context.router.getCurrentParams().productId;
    super();
    this.state = getState(id);
    this.change = () => this.setState(getState(id));
    this.send = (msg) => {
      action.sendComment(msg, id);
    }
  }

  componentDidMount () {
    ProductStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    ProductStore.removeChangeListener(this.change);
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    return (
      <FlexLayout>
        <Header title="留言" back={true}/>
        <Content>
          {
            this.state.comments.map((comment, index) => {
              return (
                <div key={`comment-${index}`} style={{display: 'flex', marginTop: '10px'}}>
                  <AvatarImage url={comment.get('commenter').get('avatarImage') && comment.get('commenter').get('avatarImage').url()} width="24px"/>
                  <div style={{display: 'flex', justifyContent: 'center', flexFlow: 'column', flex: 1, padding: '6px'}}>
                    <div style={{color: 'lightgray'}}>
                      {comment.get('commenter').get('name') || comment.get('commenter').get('username')}
                    </div>
                    <div style={{marginTop: '5px'}}>
                      {comment.get('content')}
                    </div>
                  </div>
                  <div style={{display: 'flex', width: "60px", padding: '6px', color: 'lightgray', fontSize: '0.8em'}}>
                    {moment(comment.createdAt).locale('zh-TW').fromNow()}
                  </div>
                </div>
              )
            })
          }
          <Spinner display={this.state.loading} message="讀取中"/>
        </Content>
        <MessageInputBox sendFn={this.send}/>
        <Footer/>
      </FlexLayout>
    );
  }
}

export default CommentBox;
