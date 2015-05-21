import React from 'react';
import styles from './styles';
const m = Object.assign;

class Spinner extends React.Component {
  static get propTypes () {
    return {
      message: React.PropTypes.string,
      display: React.PropTypes.bool
    };
  }
  render () {
    return (
      <div style={m(
        styles.overlay,
        this.props.display && styles.show,
        !this.props.display && styles.hide
      )}>
        <div style={styles.spinnerBox}>
          <div style={styles.spinner}></div>
          <div style={{marginTop: '20px'}}>{this.props.message}</div>
        </div>
      </div>
    );
  }
}

export default Spinner;
