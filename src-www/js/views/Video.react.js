import React, {Component} from 'react';
import ProductStore from '../stores/ProductStore';

let getState = () => {
  let {loading, products} = ProductStore.getVideoProducts();
  return {
    loading: loading,
    products: products || []
  }
}

class Video extends Component {
  constructor () {
    super();
    this.state = getState();
    this.change = () => this.setState(getState());
  }

  componentDidMount () {
    ProductStore.addChangeListener(this.change);
  }

  componentWillUnmount () {
    ProductStore.removeChangeListener(this.change);
  }

  render () {
    let {products} = this.state;
    return (
      <div>
        {products.map(product => {
          return (
            <video key={product.id} src={product.get('video').url()} controls>
              not support
            </video>
          )
        })}
      </div>
    );
  }
}

export default Video;
