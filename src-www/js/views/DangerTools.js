import React, {Component} from 'react';
import {Layout, Header, Footer, FlexLayout, Content} from './Layout';
import action from '../actions/AppActionCreator';
import Carousel from './Components/Carousel';
import ProductStore from '../stores/ProductStore';

class DangerTools extends Component {
  constructor () {
    super();
    this.state = {
      ProductStore: ProductStore.getState()
    };
    this.handleClick = (e) => {
      if (e.target.name === 'delete-inproper') {
        action.deleteInproper();
      }
    };
  }
  render () {
    let products = this.state.ProductStore.products;
    let thumbs = products.map(product => product.content.get('thumbnailImages'));
    let images = [for (t of thumbs[0]) {src: t.url()}];
    return (
      <FlexLayout>
        <Header/>
        <Content>
          <button onTouchTap={this.handleClick} name="delete-inproper">delete inproper products of mine</button>
          <Carousel images={images}/>
        </Content>
        <Footer/>
      </FlexLayout>
    );
  }
}

export default DangerTools;
