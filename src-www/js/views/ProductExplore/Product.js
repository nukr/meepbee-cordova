import React from 'react';
import ProductBrief from './ProductBrief';
import ProductImage from './ProductImage';

class Product extends React.Component {
  render () {
    return (
      <div>
        <ProductImage {...this.props}/>
        <ProductBrief {...this.props}/>
      </div>
    );
  }
}

export default Product;
