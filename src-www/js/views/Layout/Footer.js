import React, {Component} from 'react';
import {DefaultRoute, Link, Route, RouteHandler} from 'react-router'
import styles from './styles.js';
import ProductInfoFooter from './ProductInfoFooter';
let m = Object.assign;

class Footer extends Component {
  static get propTypes () {
    return {
      active: React.PropTypes.string,
      mode: React.PropTypes.string
    };
  }

  render () {
    switch (this.props.mode) {
      case 'info':
        return <ProductInfoFooter product={this.props.product}/>;
      default:
        return <NavFooter active={this.props.active} />;
    }
  }
}

class NavFooter extends Component {
  render () {
    return (
      <footer style={styles.footer}>
        <Link style={Object.assign({},
          styles.footerBtn,
          this.props.active === 'sell' && styles.active
        )} to='sell'>
          <div style={m(
            {},
            styles.footerBtnInner,
            styles.photoOff,
            this.props.active === 'sell' && styles.photoOn,
            styles.backgroundSettings)}>賣東西</div>
        </Link>

        <Link style={Object.assign({},
          styles.footerBtn,
          this.props.active === 'store' && styles.active
        )} to='products'>
          <div style={m(
            {},
            styles.footerBtnInner,
            styles.storeOff,
            this.props.active === 'store' && styles.storeOn,
            styles.backgroundSettings)}>商店</div>
        </Link>

        <Link style={Object.assign({},
          styles.footerBtn,
          this.props.active === 'message' && styles.active
        )} to='message'>
          <div style={m(
            {},
            styles.footerBtnInner,
            styles.messageOff,
            this.props.active === 'message' && styles.messageOn,
            styles.backgroundSettings)}>訊息</div>
        </Link>

        <Link style={Object.assign({},
          styles.footerBtn,
          this.props.active === 'profile' && styles.active
        )} to='profile'>
          <div style={m(
            {},
            styles.footerBtnInner,
            styles.profileOff,
            this.props.active === 'profile' && styles.profileOn,
            styles.backgroundSettings)}>簡介</div>
        </Link>

      </footer>
    );
  }
}

export default Footer;

