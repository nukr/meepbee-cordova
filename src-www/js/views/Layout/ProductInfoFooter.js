import React from 'react';
import styles from './styles';
let m = Object.assign;

class ProductInfoFooter extends React.Component {
  constructor (props, context) {
    super();
    this.handleClick = () => {
      context.router.transitionTo(`/products/cart/${this.props.product.id}`);
    };
    this.chatRoom = () => {
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    return (
      <div style={styles.productInfoFooter}>
        <div onTouchTap={this.chatRoom} style={m({flex: 1, background: '#424242'}, styles.center)}>
          <img style={{width: '64px'}} src={require('../../../assets/elements/tab_icon_message_white.png')} />
        </div>
        <div onTouchTap={this.handleClick} style={m({flex: 3}, styles.center)}>購買商品</div>
      </div>
    );
  }
}

export default ProductInfoFooter;

