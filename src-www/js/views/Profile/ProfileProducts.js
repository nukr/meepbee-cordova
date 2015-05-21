import React, {Component} from 'react';

class ProfileProducts extends Component {
  render () {
    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {this.props.products.map(product => <ProductBlock key={product.id} product={product}/>)}
      </div>
    );
  }
}

class ProductBlock extends Component {
  constructor (props, context) {
    super();
    this.handleClick = (id) => {
      context.router.transitionTo(`/products/${id}`);
    }
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    let product = this.props.product;
    let url = product.get('thumbnailImages')[0].url();
    return (
      <div onTouchTap={this.handleClick.bind(null, product.id)} style={{position: 'relative'}}>
        <img src={url} style={{width: '50vw', height: '50vw'}}/>
        <div style={{position: 'absolute', left: 0, top: '80%', color: 'white', background: 'gray', padding: 5}}>{product.get('price')}</div>
      </div>
    );
  }
}

export default ProfileProducts;
