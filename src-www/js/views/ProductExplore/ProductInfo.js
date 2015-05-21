import React from 'react';
import {Panel, PanelHeader, PanelLink, PanelRadio, PanelRadioGroup, PanelInput, PanelLabel, IncrementButton} from '../Panels';
import {Header, FlexLayout, Content} from '../Layout';
import ProductInfoFooter from '../Layout/ProductInfoFooter';
import ProductImage from './ProductImage';
import ProductDetail from './ProductDetail';
import ProductStore from '../../stores/ProductStore';
import UserStore from '../../stores/UserStore';
import Router from 'react-router';
import Spinner from '../Components/Spinner';
import styles from './styles';
import superlog from '../../util/log';
let log = superlog('ProductInfo');
let m = Object.assign;
import action from '../../actions/AppActionCreator';

let getState = (id) => {
  let {loading, productContainer, productsSellByUser} = ProductStore.getProductById(id);
  let me = UserStore.getCurrentUser();

  return {
    loading: loading,
    isOwnedByMe: (me && me.id) === (productContainer && productContainer.product.get('seller').id),
    productContainer: productContainer,
    productsSellByUser: productsSellByUser || []
  }
};

class ProductInfo extends React.Component {
  constructor (props, context) {
    let productId = context.router.getCurrentParams().productId;
    super();
    this.state = getState(productId);
    this.change = () => this.setState(getState(productId));
    this.share = () => {
      window.plugins.socialsharing.share(null, null, null, `http://meepbee.com/product/${context.router.getCurrentParams().productId}`);
    };

    /**
     * Footer Function Callbacks
     *
     */
    this.deleteProductFn = (product) => {
      log('deleteProductFn', product)
    }
    this.editProductFn = (product) => {
      log('editProductFn', product)
    }
    this.buyProductFn = (product) => {
      context.router.transitionTo(`/products/cart/${product.id}`)
    }
    this.chatRoomFn = (product) => {
      let me = UserStore.getCurrentUser();
      let seller = product.get('seller')
      context.router.transitionTo(`/chatroom/${me.id}${product.id}${seller.id}`)
    }
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  componentDidMount () {
    ProductStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    ProductStore.removeChangeListener(this.change);
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    /**
     * 這是一個 workaround ，主要解決從 ProductDetail 其他商品連結過來的，
     * 因為是同一個 View 所以不會重新觸發 getState() 所以無法要到新資料。
     */
    let prevId = prevState.product && prevState.product.id;
    let thisStateProductId = this.state.product && this.state.product.id;
    let currentId = this.context.router.getCurrentParams().productId;
    if (
      prevId && // prevId 未定義
      !this.state.loading && // 在 loading 中
      ( prevId !== currentId ) && // 上一個productId 跟現在的 productId 不同
      ( thisStateProductId !== currentId )
    ) action.emitChange();
  }

  render () {
    let {productContainer, productsSellByUser} = this.state;
    if (this.state.loading) {
      return (
        <Spinner display={this.state.loading} message="讀取中"/>
      );
    } else {
      return (
        <FlexLayout>
          <Header title="商品資訊" back={true} action={this.share} icon="share-alt" />
          <Content>
            <ProductImage productContainer={this.state.productContainer} />
            <ProductDetail productContainer={this.state.productContainer} productsSellByUser={productsSellByUser}/>
            <Spinner display={this.state.loading} message="讀取中"/>
          </Content>
          <ProductInfoFooter
            deleteProductFn={this.deleteProductFn.bind(null, productContainer.product)}
            editProductFn={this.editProductFn.bind(null, productContainer.product)}
            chatRoomFn={this.chatRoomFn.bind(null, productContainer.product)}
            buyProductFn={this.buyProductFn.bind(null, productContainer.product)}
            isOwnedByMe={this.state.isOwnedByMe}
            product={productContainer.product}
          />
        </FlexLayout>
      );
    }
  }
}

export default ProductInfo;

