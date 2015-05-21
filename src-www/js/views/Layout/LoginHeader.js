import React from 'react';
import styles from './styles';

class LoginHeader extends React.Component {
  render () {
    return (
      <header style={
        Object.assign(
          {},
          styles.header
        )
      }>
        <div>取消</div>
        <div>登入</div>
        <div onTouchTap={this.login}>登入</div>
      </header>
    );
  }
}

export default LoginHeader;

