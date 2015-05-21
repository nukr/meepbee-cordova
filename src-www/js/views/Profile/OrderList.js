import React, {Component} from 'react';
import { FlexLayout, Content, Header, Footer } from '../Layout';
import orderHelper from './orderHelper';
import styles from './styles';

class OrderList extends Component {
  constructor (props, context) {
    super();
    this.handleClick = (order, e) => {
      context.router.transitionTo(`/order-status/${order.id}`);
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    return (
      <div>
        {this.props.orders.map(order => <OrderListItem order={order} key={order.id} onTouchTap={this.handleClick}/>)}
      </div>
    );
  }
}

class OrderListItem extends Component {
  render () {
    let order = this.props.order;
    let orderForm = order.get('orderForm');
    return (
      <div onTouchTap={this.props.onTouchTap.bind(null, order)} style={styles.orderListItemContainer}>
        <img style={{padding: '10px'}} width="48px" height="48px" src={orderForm.productImageURL} alt="product image" />
        <div style={styles.orderStatus}>
          <div>{ orderForm.title }</div>
          <div style={{fontSize: '0.8em', color: 'lightgray'}}>{ orderHelper('zh_TW', order.get('orderStatus')) }</div>
        </div>

        <div style={styles.orderPrice}>${ orderForm.pricePerProduct * orderForm.quantity + orderForm.shipping.fee }</div>
      </div>
    );
  }
}

module.exports = OrderList;

