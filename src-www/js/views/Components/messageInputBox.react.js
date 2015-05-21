import React, {Component} from 'react';
let m = Object.assign;
let styles = {
  inputBoxWrapper: {
    height: '48px',
    display: 'flex',
    borderTop: '1px solid lightgray',
    alignItems: 'center',
    padding: '0px 9px'
  },

  inputBox: {
    paddingLeft: '7px',
    height: '24px',
    flex: 1,
    borderRadius: '3px',
    marginRight: '9px',
    border: '1px solid lightgray'
  },

  sendBtn: {
    color: 'lightgray',
    width: '48px',
    height: '28px',
    backgroundColor: '#0ed8ab',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3px'
  }
}

class MessageInputBox extends Component {
  constructor () {
    super();
    this.state = {unsendMsg: ''}
    this.input = (e) => this.setState({unsendMsg: e.target.value});
    this.cleanup = (e) => React.findDOMNode(this.refs.messageInput).value = '';
  }

  static get propTypes () {
    return {
      sendFn: React.PropTypes.func
    };
  }

  render () {
    return (
      <div style={styles.inputBoxWrapper}>
        <input onChange={this.input} name="msg" style={styles.inputBox} type="text" placeholder="新留言" ref="messageInput"/>
        <div onTouchTap={this.props.sendFn.bind(null, this.state.unsendMsg)} onTouchEnd={this.cleanup} style={m({},
          styles.sendBtn,
          this.state.unsendMsg.length > 0 && {color: 'white'})}>
          傳送
        </div>
      </div>
    );
  }
}

export default MessageInputBox;
