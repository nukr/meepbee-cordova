import React, {Component} from 'react';
import styles from './styles';
import cx from 'classnames';
let m = Object.assign;
import superlog from '../../util/log';
let log = superlog('Infinite');



class Infinite extends Component {
  constructor () {
    super();
    this.handleTouchEnd = () => {
      let content = React.findDOMNode(this.refs.content);
      if (content.scrollTop < 48) {
        if(content.scrollTop < 5) {
          this.props.refreshFn();
        }
        content.scrollTop = 48;
      }
    }
  }

  componentDidMount () {
    let content = React.findDOMNode(this.refs.content);
    content.scrollTop = 48;
  }

  render () {
   let refresh = {
     'fa': true,
     'fa-refresh': true,
     'fa-spin': true
    };
    return (
      <div
        onTouchEnd={this.handleTouchEnd}
        onScroll={this.props.onScroll}
        style={m({}, styles.content, this.props.style)}
        ref="content">
        <div onTouchTap={this.props.refreshFn} style={{height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          Release to Refresh
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Infinite;
