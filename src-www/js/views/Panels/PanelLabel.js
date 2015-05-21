import React from 'react';
import styles from './styles';

class PanelLabel extends React.Component {
  render () {
    return (
      <div style={styles.label}>
        <div>{this.props.left}</div>
        <div>{this.props.right}</div>
      </div>
    );
  }
}

export default PanelLabel;

