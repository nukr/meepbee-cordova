import React from 'react';
import styles from './styles';
import { FlexLayout, Content, Header, Footer } from '../Layout';

import Router from 'react-router';
let {DefaultRoute, Link, Route, RouteHandler} = Router;

class NavTabs extends React.Component {
  render () {
    return (
      <div style={styles.navTabs}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = NavTabs;

