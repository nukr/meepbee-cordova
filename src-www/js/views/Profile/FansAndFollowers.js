import React from 'react';
import Store from '../../stores/UserStore';
import {Link} from 'react-router';
import styles from './styles';

class fansAndFollower extends React.Component {
  render () {
    return (
      <div style={{
        width: '100%',
        marginTop: '100px'
      }}>
        <div style={styles.fansAndFollowers}>
          <div style={{
            flex: 1,
            textAlign: 'center'
          }}>
            {this.props.fans}
          </div>
          <div style={{
            flex: 1,
            textAlign: 'center'
          }}>
            {this.props.follows}
          </div>
        </div>

        <div style={styles.fansAndFollowers}>
          <div style={{
            borderRight: '1px solid black',
            flex: 1,
            textAlign: 'center'
          }}>
            粉絲人數
          </div>
          <div style={{
            flex: 1,
            textAlign: 'center'
          }}>
            追蹤人數
          </div>
        </div>
      </div>
    );
  }
}

export default fansAndFollower;


