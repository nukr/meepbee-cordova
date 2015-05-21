import React from 'react';
import styles from './styles';

class Panel extends React.Component {
  displayName: 'Panel'

  static get propTypes () {
    return {
      className: React.PropTypes.string,
      component: React.PropTypes.any
    };
  }

  render () {
    return (
      <div style={styles.panel}>
        {this.props.children}
      </div>
    );
  }

}

export default Panel;

