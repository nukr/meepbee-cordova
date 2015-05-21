import React from 'react';
import styles from './styles';

class ConfirmCheckout extends React.Component {
  constructor () {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  static get propTypes () {
    return {
      callback: React.PropTypes.func.isRequired
    };
  }

  handleClick () {
    this.props.callback();
  }

  render () {
    return (
      <div onTouchTap={this.handleClick} style={styles.confirmCheckout}>
        <div>確定結帳</div>
      </div>
    );
  }
}

export default ConfirmCheckout;
