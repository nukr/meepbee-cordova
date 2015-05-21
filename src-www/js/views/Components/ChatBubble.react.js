import React, {Component} from 'react';
let m = Object.assign;

let styles = {
  chatBubble: {
    padding: '7px 13px',
    backgroundColor: 'lightgray',
    borderRadius: '13px'
  },
  chatBubbleWrapper: {
    display: 'flex',
    margin: '12px 12px 0px 12px',
  }
}

class ChatBubble extends Component {
  static get propTypes () {
    return {
      text: React.PropTypes.string,
      pullRight: React.PropTypes.bool
    };
  }

  render () {
    return (
      <div
        style={
          m(
            {},
            styles.chatBubbleWrapper,
            this.props.pullRight && {justifyContent: 'flex-end'}
          )
        }
      >
        <div style={m(
          {},
          styles.chatBubble,
          {backgroundColor: '#0ed8ab'}
        )}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default ChatBubble;
