import React, {Component} from 'react';
import styles from './styles';
let m = Object.assign;

class ProductInfoFooter extends Component {
  constructor (props, context) {
    super();
    this.handleClick = () => {
      context.router.transitionTo(`/products/cart/${this.props.product.id}`);
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    if (this.props.isOwnedByMe) {
      return (
        <div style={styles.productInfoFooter}>
          <TrashBtn {...this.props}/><EditProductBtn {...this.props}/>
        </div>
      )
    } else {
      return (
        <div style={styles.productInfoFooter}>
          <ChatBtn {...this.props}/><BuyProductBtn {...this.props}/>
        </div>
      )
    }
  }
}

/**
 * logic like this
 * @example
 *   if (product.get('seller') === me) {
 *     <Trashcan/>
 *     <EditProductBtn/>
 *   else
 *     <ChatBtn>
 *     <BuyProductBtn/>
 * }
 *
 */
class TrashBtn extends Component {
  render () {
    return (
      <div onTouchTap={this.props.deleteProductFn} style={m({flex: 1, background: '#424242'}, styles.center)}>
        <i style={{fontSize: '48px'}} className="fa fa-trash"></i>
      </div>
    );
  }
}

class EditProductBtn extends Component {
  render () {
    return (
      <div onTouchTap={this.props.editProductFn} style={m({flex: 3}, styles.center)}>編輯商品</div>
    );
  }
}

class ChatBtn extends Component {
  render () {
    return (
      <div onTouchTap={this.props.chatRoomFn} style={m({flex: 1, background: '#424242'}, styles.center)}>
        <img style={{width: '64px'}} src={require('../../../assets/elements/tab_icon_message_white.png')} />
      </div>
    );
  }
}

class BuyProductBtn extends Component {
  render () {
    return (
      <div onTouchTap={this.props.buyProductFn} style={m({flex: 3}, styles.center)}>購買商品</div>
    );
  }
}

export default ProductInfoFooter;

