import React, {Component} from 'react';
import {Header, Footer, FlexLayout, Content} from './Layout';
import ProductStore from '../stores/ProductStore';
import UserStore from '../stores/UserStore';

let getState = () => {
  let me = UserStore.getCurrentUser();
  let profile = UserStore.getUserProfile(me.id);
  return profile;
}

class SaleByMe extends Component {
  constructor (props, context) {
    super();
    this.state = getState()
    this.change = () => this.setState(getState());
    this.transitionToProductInfo = (productId) => {
      context.router.transitionTo(`/products/${productId}`)
    }
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    }
  }
  componentDidMount () {
    UserStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    UserStore.removeChangeListener(this.change);
  }

  render () {
    let products = this.state.products || [];
    return (
      <FlexLayout>
        <Header title="販售的商品"/>
        <Content>
          <div style={{display: 'flex', flexFlow: 'row wrap'}}>
            {
              products.map(product => {
                return (
                  <div key={product.id} style={{position: 'relative'}} onTouchTap={this.transitionToProductInfo.bind(null, product.id)}>
                    <img style={{width: '50vw'}} src={product.get('thumbnailImages')[0].url()}/>
                    <div style={{position: 'absolute', top: '80%', left: '0px', background: '#424242', color: 'white'}}>{product.get('price')}</div>
                  </div>
                )
              })
            }
          </div>
        </Content>
        <Footer/>
      </FlexLayout>
    );
  }
}

export default SaleByMe;
