import React, {Component} from 'react';

/**
 * React Router
 *
 */
import {DefaultRoute, Link, Route, RouteHandler, NotFoundRoute} from 'react-router';

/**
 * Views
 *
 */
import ProductsContainer from './ProductExplore/ProductsContainer';
import ProductInfo from './ProductExplore/ProductInfo';
import ShoppingCart from './ProductExplore/ShoppingCart';
import Message from './Message/Message';
import NewPayment from './NewPayment';
import NewShipping from './NewShipping';
import NotFound from './NotFound';
import ImageCrop from './ImageCrop';
import CanvasCrop from './CanvasCrop';
import DangerTools from './DangerTools';
import Chat from './Message/Chat';
import ChatRoom from './Message/ChatRoom';
import OrderStatus from './Profile/OrderStatus';
import OrderList from './Profile/OrderList';
import SignUp from './Profile/SignUp';
import UserProfile from './Profile/UserProfile';
import FollowsList from './FollowsList';
import FansList from './FansList';
import CommentBox from './CommentBox.react';
import SaleByMe from './SaleByMe.react';
import Video from './Video.react'
import TestInfinite from './ProductExplore/TestInfinite';
import { Sell, PaymentSelect, ShippingSelect } from './Sell'
import {
  Profile, Payments, Shippings, Personally,
  Login, EditPersonalData, Order, Sale,
  Activity, Liked, Bought
} from './Profile';

class Main extends Component {
  constructor (props, context) {
    super();
  }

  componentDidMount () {
    document.addEventListener('backbutton', (e) => {
      this.context.router.goBack();
      e.preventDefault();
      return false;
    });
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <RouteHandler/>
    );
  }
}

let routes = (
  <Route name="app" path="/" handler={Main}>
    <Route name="products" path="/products" handler={TestInfinite}>Products</Route>
    <Route name="product-detail" path="/products/:productId" handler={ProductInfo}>Product Information</Route>
    <Route name="shopping-cart" path="/products/cart/:productId" handler={ShoppingCart}>Shopping Cart</Route>
    <Route name="profile" path="/profile" handler={Profile}>Profile</Route>
    <Route name="message" path="/message" handler={Message}>Message</Route>
    <Route name="payments" path="/payments" handler={Payments}>Payments</Route>
    <Route name="shippings" path="/shippings" handler={Shippings}>Shippings</Route>
    <Route name="personally" path="/personally" handler={Personally}>Personally</Route>
    <Route name="login" path="/login" handler={Login}>Login</Route>
    <Route name="sell" path="/sell" handler={Sell}>Sell</Route>
    <Route name="payments-select" path="/sell/payments" handler={PaymentSelect}>PaymentSelect</Route>
    <Route name="shippings-select" path="/sell/shippings" handler={ShippingSelect}>ShippingSelect</Route>
    <Route name="new-payment" path="/new-payment" handler={NewPayment}>NewPayment</Route>
    <Route name="new-shipping" path="/new-shipping" handler={NewShipping}>NewShipping</Route>
    <Route name="sale" path="/sale" handler={Sale}>Sale</Route>
    <Route name="bought" path="/bought" handler={Bought}>Bought</Route>
    <Route name="activity" path="/activity" handler={Activity}>Activity</Route>
    <Route name="liked" path="/liked" handler={Liked}>Liked</Route>
    <Route name="image-crop" path="/image-crop" handler={ImageCrop}>ImageCrop</Route>
    <Route name="canvas-crop" path="/canvas-crop" handler={CanvasCrop}>CanvasCrop</Route>
    <Route name="danger" path="/danger" handler={DangerTools}>DangerTools</Route>
    <Route name="chat" path="/chat" handler={Chat}>Chat</Route>
    <Route name="chatroom" path="/chatroom/:chatRoomId" handler={ChatRoom}>ChatRoom</Route>
    <Route name="order-status" path="/order-status/:orderId" handler={OrderStatus}>OrderStatus</Route>
    <Route name="order" path="/order" handler={Order}>Order</Route>
    <Route name="video" path="/video" handler={Video}>Video</Route>
    <Route name="comment" path="/comment/:productId" handler={CommentBox}>CommentBox</Route>
    <Route name="edit-personal-data" path="/edit-personal-data" handler={EditPersonalData}>EditPersonalData</Route>



    <Route name="signup" path="/signup" handler={SignUp}>SignUp</Route>
    <Route name="user-profile" path="/user-profile/:userId" handler={UserProfile}>UserProfile</Route>
    <Route name="follows-list" path="/follows-list/:userId" handler={FollowsList}>FollowsList</Route>
    <Route name="fans-list" path="/fans-list/:userId" handler={FansList}>FansList</Route>
    <Route name="test-infinite" path="/test-infinite" handler={TestInfinite}>TestInfinite</Route>
    <Route name="sale-by-me" path="/sale-by-me" handler={SaleByMe}>SaleByMe</Route>
    <DefaultRoute handler={TestInfinite} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

export default routes;
