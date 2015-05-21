import React, {Component} from 'react';
import Infinite from 'react-infinite';
import ProductStore from '../../stores/ProductStore';
import UserStore from '../../stores/UserStore';
import action from '../../actions/AppActionCreator';
import {FlexLayout, Header, Footer} from '../Layout';
import Product from './Product';
import FriendStore from '../Components/FriendStore/FriendStore.react';
import superlog from '../../util/log';
let log = superlog('TestInfinite');

let getState = (ctx) => {
  let { products, loading, scrollTop, friends} = ProductStore.getProducts();
  return {
    isInfiniteLoading: loading,
    scrollTop: scrollTop,
    products: products || [],
    friends: friends || []
  }
}

class TestInfinite extends Component {
  constructor (props, context) {
    super();
    this.state = getState();
    this.state.containerHeight = document.body.clientHeight - 96;
    this.state.containerWidth = document.body.clientWidth;
    this.change = () => this.setState(getState());
    this.handleInifiniteLoad = () => {
      this.setState({
        isInfiniteLoading: true
      })
      action.infinite();
    };
    this.elementInfiniteLoad = () => {
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px', color: 'lightgray'}}>
          <i className="fa fa-spinner fa-pulse fa-2x"></i>
          <div style={{marginLeft: '10px', fontSize: '16px'}}>Loading</div>
        </div>
      )
    }
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
      if (UserStore.getCurrentUser()) {
        action.toggleLike(productId);
      } else {
        this.context.router.transitionTo('/login');
      }
    }
    this.goUserProfile = (userId) => {
      context.router.transitionTo(`/user-profile/${userId}`);
    }
    this.buildElements = () => {
      let elements = this.state.products.map((productContainer, index) => {
        let productId = productContainer.product.id;
        return (
          <Product
            key={`product-${index}`}
            productContainer={productContainer}
            commentFn={this.commentFn.bind(null, productId)}
            likeFn={this.likeFn.bind(null, productId)}
            purchaseFn={this.purchaseFn.bind(null, productId)}
            detailFn={this.detailFn.bind(null, productId)}
          />
        )
      })

      if (this.state.friends.length) {
        let friends = this.state.friends.map((friendContainer, index) => {
          return (
            <FriendStore
              key={`friendstore-${index}`}
              goUserProfile={this.goUserProfile.bind(null, friendContainer.friend.id)}
              friend={friendContainer.friend}
              products={friendContainer.products}
            />
          )
        })
        elements = friends.concat(elements);
      }

      return elements;
    }
    this.refresh = () => {
      action.refresh();
    }

    this.buildElementsLengthArray = () => {
      let perProductHeight = document.body.clientWidth + 46 + 114;
      let perFriendStoreHeight = 62 + document.body.clientWidth / 4;
      let friendStoreLength = this.state.friends.length;
      let productsLength = this.state.products.length;
      let lengthArray = [];
      for (var i=0; i < friendStoreLength; ++i) {
        lengthArray.push(perFriendStoreHeight);
      }
      for (var i=0; i < productsLength; ++i) {
        lengthArray.push(perProductHeight);
      }
      return lengthArray;
    }
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  componentDidMount () {
    let foundInfinite = React.findDOMNode(this.refs.infinite);
    foundInfinite.scrollTop = this.state.scrollTop;
    ProductStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    ProductStore.removeChangeListener(this.change);
    let foundInfinite = React.findDOMNode(this.refs.infinite);
    ProductStore.productContainerScrollTop = foundInfinite.scrollTop;
  }
  render () {
    return (
      <FlexLayout>
        <Header title="meepbee" action={this.refresh} icon="refresh"/>
        <Infinite
          containerHeight={this.state.containerHeight}
          elementHeight={this.buildElementsLengthArray()}
          infiniteLoadBeginBottomOffset={1000}
          onInfiniteLoad={this.handleInifiniteLoad}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}
          ref="infinite"
        >
          {this.buildElements()}
        </Infinite>
        <Footer active="store"/>
      </FlexLayout>
    );
  }
}

class FriendStores extends Component {
  render () {
    return (
      <div>
        {
          this.props.friends.map((friendContainer) => {
            return (
              <FriendStore
                goUserProfile={this.goUserProfile.bind(null, friendContainer.friend.id)}
                friend={friendContainer.friend}
                products={friendContainer.products}
              />
            )
          })
        }
      </div>
    )
  }
}

export default TestInfinite;
