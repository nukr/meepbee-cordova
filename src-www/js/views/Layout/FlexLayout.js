import React from 'react';
import styles from './styles';

class FlexLayout extends React.Component {
  render () {
    return (
      <div style={styles.flexLayout}>
        {this.props.children}
      </div>
    );
  }
}

export default FlexLayout;

