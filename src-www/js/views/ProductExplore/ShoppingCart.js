import React from 'react';
import ProductStore from '../../stores/ProductStore';
import UserStore from '../../stores/UserStore';
import Router from 'react-router';
import {Panel, PanelHeader, PanelLink, PanelRadio, PanelRadioGroup, PanelInput, PanelLabel, Stepper} from '../Panels';
import {Layout, Header, Footer, FlexLayout, Content, ConfirmCheckout} from '../Layout';
import Spinner from '../Components/Spinner';
import action from '../../actions/AppActionCreator';
import superlog from '../../util/log';
let log = superlog('ShoppingCart');

let handlers = {
  change () {
    this.setState({
      UserStore: UserStore.getState(),
      productContainer: ProductStore.getProductById(this.context.router.getCurrentParams().productId)
    });
  },

  handleChange (value, name) {
    switch (name) {
      case 'shipping':
        this.setState({
          shipping: value
        });
        break;
      case 'payment':
        this.setState({
          payment: value
        });
        break;
      default:
    }
  },

  calc () {
    let shippingFee = this.state.shipping && this.state.shipping.fee;
    let productPrice = +this.state.productContainer.product.get('price').replace(/\D/g, '');
    let currQty = this.state.quantity;
    let totalPrice = shippingFee + productPrice * currQty;
    return {productPrice, totalPrice, currQty, shippingFee};
  },

  footerCallback () {
    if (this.state.quantity === 0) {
      alert('請選擇數量');
    } else {
      let {totalPrice, productPrice} = this.calc();
      let user = this.state.UserStore.currentUser.toJSON();
      let orderForm = {
        address: this.state.address,
        note: this.state.note,
        payment: this.state.payment,
        shipping: this.state.shipping,
        phoneNumber: this.state.phoneNumber || user.mobile,
        pricePerProduct: productPrice,
        productImageName: this.state.productContainer.product.get('thumbnailImages')[0].name(),
        productImageURL: this.state.productContainer.product.get('thumbnailImages')[0].url(),
        quantity: this.state.quantity,
        realName: this.state.name,
        title: this.state.productContainer.product.get('title'),
        product: this.state.productContainer.product.toJSON()
      };
      let order = {
        buyer: this.state.UserStore.currentUser,
        seller: this.state.productContainer.product.get('seller'),
        orderForm: orderForm,
        orderStatus: 'ORDER_STATUS_UNREAD'
      };
      action.createOrder(order);
      this.context.router.transitionTo('/');
    }
  },

  incBtnCallback (action) {
    switch (action) {
      case 'minus':
        if (this.state.quantity > 0) {
          this.setState({
            quantity: this.state.quantity - 1
          });
        }
        break;
      case 'plus':
        if (this.state.quantity < this.state.productContainer.product.get('quantity')) {
          this.setState({
            quantity: this.state.quantity + 1
          });
        }
        break;
      default:
    }
  },

  handleInput (e) {
    this.state[e.target.name] = e.target.value;
  }
};

class ShoppingCart extends React.Component {
  constructor (props, context) {
    super();
    this.state = {
      quantity: 0,
      shippingFee: 0,
      UserStore: UserStore.getState(),
      productContainer: ProductStore.getProductById(context.router.getCurrentParams().productId)
    };
    for (let key in handlers)
      this[key] = handlers[key].bind(this);
  }

  static willTransitionTo (transition) {
    let user = UserStore.getCurrentUser();
    if (!(user && user.authenticated())) {
      transition.redirect('/login');
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

  render () {
    let {product} = this.state.productContainer;
    if (typeof product === 'undefined') {
      return (
        <div style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center'
        }}>
          <Spinner display={true} message="讀取中"></Spinner>
        </div>
      );
    } else {
      let {productPrice, totalPrice, shippingFee} = this.calc();
      return (
        <FlexLayout>
          <Header title="購物車頁面" back={true}/>
          <Content>
            <div style={{
              display: 'flex',
              paddingLeft: '20px'
            }}>
              <div>
                <img src={product.get('thumbnailImages')[0].url()} style={{width: '100px'}} alt='' />
              </div>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{product.get('title')}</div>
            </div>
            <PanelHeader>付款方式</PanelHeader>
            <Panel>
              <PanelRadioGroup onChange={this.handleChange} name='payment'
                data={[for (p of product.get('payments')) {title: p.tradingWay, value: p}]}/>
            </Panel>

            <PanelHeader>運送方式</PanelHeader>
            <Panel>
              <PanelRadioGroup onChange={this.handleChange} name='shipping'
                display="price"
                data={[for (s of product.get('shippings')) {title: s.shippingWay, value: s}]} />
            </Panel>

            <PanelHeader>收件人資料</PanelHeader>
            <Panel>
              <PanelInput name='name' onChange={this.handleInput} defaultValue={this.state.UserStore.currentUser.get('name')} placeholder="收件者姓名"/>
              <PanelInput name='mobile' onChange={this.handleInput} defaultValue={this.state.UserStore.currentUser.get('mobile')} placeholder="收件者電話"/>
              <PanelInput name='address' onChange={this.handleInput} defaultValue={this.state.UserStore.currentUser.get('address')} placeholder="收件者地址"/>
              <PanelInput name='note' onChange={this.handleInput} placeholder="備註"/>
            </Panel>

            <PanelHeader>價格</PanelHeader>
            <Panel>
              <PanelLabel left='商品價格' right={product.get('price')} />
              <Stepper callback={this.incBtnCallback} title='數量' currQty={this.state.quantity} quantity={product.get('quantity')}/>
              <PanelLabel left='運費' right={`$${shippingFee}`} />
              <PanelLabel left='商品總金額' right={`$${totalPrice}`} />
            </Panel>
          </Content>
          <ConfirmCheckout callback={this.footerCallback}/>
        </FlexLayout>
      );
    }
  }
}

export default ShoppingCart;
