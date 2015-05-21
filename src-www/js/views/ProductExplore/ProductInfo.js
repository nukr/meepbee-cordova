import React from 'react';
import {Panel, PanelHeader, PanelLink, PanelRadio, PanelRadioGroup, PanelInput, PanelLabel, IncrementButton} from '../Panels';
import {Header, Footer, FlexLayout, Content} from '../Layout';
import ProductImage from './ProductImage';
import ProductDetail from './ProductDetail';
import ProductStore from '../../stores/ProductStore';
import Router from 'react-router';
import Spinner from '../Components/Spinner';
import styles from './styles';
import superlog from '../../util/log';
let log = superlog('ProductInfo');
let m = Object.assign;
import action from '../../actions/AppActionCreator';

let getState = (id) => {
  let productContainer = ProductStore.getProductById(id);
  let {loading} = productContainer;
  return m(productContainer, {loading: loading});
};

class ProductInfo extends React.Component {
  constructor (props, context) {
    super();
    this.state = getState(context.router.getCurrentParams().productId);
    this.change = () => {
      this.setState(getState(context.router.getCurrentParams().productId));
    };
    this.share = () => {
      window.plugins.socialsharing.share(null, null, null, `http://meepbee.com/product/${context.router.getCurrentParams().productId}`);
    };
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
    let {product, likes, liked, comments} = this.state;
    if (this.state.loading) {
      return (
        <Spinner display={this.state.loading} message="讀取中"/>
      );
    } else {
      return (
        <FlexLayout>
          <Header title="商品資訊" back={true} action={this.share} icon="share-alt" />
          <Content>
            <ProductImage productContainer={this.state} />
            <ProductDetail {...this.state} />
            <Spinner display={this.state.loading} message="讀取中"/>
          </Content>
          <Footer mode="info" product={this.state.product}/>
        </FlexLayout>
      );
    }
  }
}

export default ProductInfo;

