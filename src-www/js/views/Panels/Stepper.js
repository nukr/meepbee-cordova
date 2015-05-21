import React, {Component} from 'react';
import styles from './styles';

class Stepper extends Component {
  constructor (props, test) {
    super();
    this.minus = this.minus.bind(this);
    this.plus = this.plus.bind(this);
  }

  static get propTypes () {
    return {
      title: React.PropTypes.string,
      quantity: React.PropTypes.number
    };
  }

  minus () {
    this.props.callback('minus');
  }

  plus () {
    this.props.callback('plus');
  }

  render () {
    return (
      <div style={styles.incrementButton}>
        <div style={styles.title}>{this.props.title}</div>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={styles.quantity}>{this.props.currQty} / {this.props.quantity}</div>
          <div onTouchTap={this.minus} style={styles.buttonLeft}>-</div>
          <div onTouchTap={this.plus} style={styles.buttonRight}>+</div>
        </div>
      </div>
    );
  }
}

export default Stepper;

