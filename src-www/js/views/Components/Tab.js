import React from 'react';
import styles from './styles';

import Router from 'react-router';
import {DefaultRoute, Link, Route, RouteHandler} from 'react-router'

let m = Object.assign;


class Tab extends React.Component {
  render () {
    return (
      <div
        style={m(
          {},
          styles.navLink,
          this.props.active && styles.navHigtlight
        )}
        onTouchTap={this.props.onTouchTap.bind(null, this.props.tabName)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Tab;

