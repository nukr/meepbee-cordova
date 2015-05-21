import React, {Component} from 'react';
import ProductStore from '../stores/ProductStore';

class CanvasCrop extends Component {
  constructor () {
    super();
    this.state = {
      ProductStore: ProductStore.getState()
    };
  }

  render () {
    return (
      <div>
        <img style={{maxWidth: '100%'}} src={this.state.ProductStore.cropImage} />
      </div>
    );
  }
}

export default CanvasCrop;
