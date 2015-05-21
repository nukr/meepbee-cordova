import React from 'react';
import styles from './styles';
let m = Object.assign;

class Content extends React.Component {
  render () {
    return (
      <div onScroll={this.props.onScroll} style={m({}, styles.content, this.props.style)}>
        {this.props.children}
      </div>
    );
  }
}

export default Content;
