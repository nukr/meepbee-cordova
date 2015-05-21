import React, {Component} from 'react';
import Product from './Product';
import Spinner from '../Components/Spinner';
import action from '../../actions/AppActionCreator';
import ProductStore from '../../stores/ProductStore';
import UserStore from '../../stores/UserStore';
import Router from 'react-router';
import {Layout, Header, Footer, FlexLayout, Infinite} from '../Layout';
import superlog from '../../util/log';
let log = superlog('ProductsContainer');
let alert2 = (...args) => {
  if (navigator.notification) {
    navigator.notification.alert(...args);
  } else {
    alert(...args);
  }
}
let isLogged = () => {
  return UserStore.getCurrentUser() ? true : false;
}

let getState = () => {
  let {loading, products, friends} = ProductStore.getProducts();

  return {
    products: products || [],
    friends: friends || [],
    loading: loading
  };
};

let lastRefreshing = false;
let loading = false;
class ProductsContainer extends Component {

  constructor (props, context) {
    super();
    this.state = getState();
    this.change = () => this.setState(getState());
    this.purchaseFn = (productId) => {
      context.router.transitionTo(`/products/cart/${productId}`);
    }
    this.detailFn = (productId) => {
      context.router.transitionTo(`/products/${productId}`);
    }
    this.commentFn = (productId, e) => {
      context.router.transitionTo(`/comment/${productId}`);
    }
    this.likeFn = (productId) => {
      action.toggleLike(productId);
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  static willTransitionTo () {
    action.refresh();
  }

  componentDidMount () {
    ProductStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    ProductStore.removeChangeListener(this.change);
  }

  refresh () {
    action.refresh();
  }

  like (productContainer) {
    log(productContainer);
    let user = UserStore.getCurrentUser();
    if (user && user.authenticated()) {
      if (typeof productContainer.liked === 'undefined') {
        action.like(productContainer);
      } else {
        action.unlike(productContainer);
      }
    } else {
      this.context.router.transitionTo('/login');
    }
  }

  handleScroll (e) {
    let d = {
      clientHeight: e.target.clientHeight,
      scrollHeight: e.target.scrollHeight,
      scrollTop: e.target.scrollTop
    };

    if (d.clientHeight + d.scrollTop >= d.scrollHeight - 500) {
      if (!loading) {
        log(loading);
        loading = true;
        action.fetch();
        setTimeout(() => {
          loading = false;
        }, 4000);
      }
    }
  }

  renderProducts (products) {
    if (products.length) {
      return products.map((productContainer, index) => {
        let productId = productContainer.product.id;
        return (
          <Product
            key={`product-${index}`}
            commentFn={this.commentFn.bind(null, productId)}
            likeFn={this.likeFn.bind(null, productId)}
            purchaseFn={this.purchaseFn.bind(null, productId)}
            detailFn={this.detailFn.bind(null, productId)}
            onTouchTap={this.handleClick}
            productContainer={productContainer}
          />
        );
      });
    } else {
      return (
        <div style={{height: '10000px'}}></div>
      );
    }
  }

  render () {
    let {products, loading, friends} = this.state;
    return (
      <FlexLayout>
        <Header title="meepbee"/>
        <Infinite refreshFn={this.refresh} isRefreshing={true} onScroll={this.handleScroll} ref="content">
          <FriendRelation friends={friends}/>
          {this.renderProducts(products)}
          <Spinner display={loading} message='讀取中'/>
        </Infinite>
        <Footer active="store" />
      </FlexLayout>
    );
  }
}


class FriendRelation extends Component {
  render () {
    return (
      <div>
        <div style={{height: '48px', display: 'flex', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px', justifyContent: 'space-between'}}>
          <div>
            找出更多meepbee的朋友
          </div>
          <div>
            <i className='fa fa-chevron-right'></i>
          </div>
        </div>
        {this.props.friends.map(f => <FriendStore key={f.friend.id} friendsAssociated={f}/>)}
      </div>
    );
  }
}

class FriendStore extends Component {
  constructor (props, context) {
    super();
    this.intoFriendStore = (friend, e) => {
      this.context.router.transitionTo(`/user-profile/${friend.id}`);
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    let {friend, products} = this.props.friendsAssociated;
    return (
      <div style={{marginBottom: '20px'}} onTouchTap={this.intoFriendStore.bind(null, friend)}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex'}}>
            <div>
              <img src={friend.get('avatarImage').url()} style={{width: '36px', borderRadius: '18px'}}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', color: 'lightgray'}}>
              {friend.get('name')}
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', color: 'lightgray', fontSize: '0.8em'}}>
            {products.length} 個商品
          </div>
        </div>
        <div style={{width: '10000px'}}>
          {products.map(product => <img key={product.id} src={product.get('images')[0].url()} style={{width: '25vw', height: '25vw'}}/>)}
        </div>
      </div>
    );
  }
}

export default ProductsContainer;
