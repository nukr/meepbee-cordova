import React from 'react';
import styles from './styles';
import Carousel from '../Components/Carousel';
import superlog from '../../util/log';
let log = superlog('ProductImage');

class ProductImage extends React.Component {
  constructor (props, context) {
    super();
    this.state = {
      loaded: false
    };
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showUserProfile = (sellerId, e) => {
      e.stopPropagation();
      e.preventDefault();
      context.router.transitionTo(`/user-profile/${sellerId}`);
    }
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  handleOnLoad () {
    this.setState({loaded: true});
  }

  handleClick (context, product, action) {
    if (typeof this.props.onTouchTap === 'function') {
      this.props.onTouchTap(context, product, action);
    }
  }

  render () {
    let { product } = this.props.productContainer;
    let seller = product.get('seller');
    let avatarImage = (() => {
      let img = seller.get('avatarImage');
      if (typeof img === 'undefined') {
        return require('../../../assets/elements/img_avatar_nophoto.png');
      } else {
        return img.url();
      }
    })();
    let images = [for (t of product.get('thumbnailImages')) {src: t.url()}];

    return (
      <div style={styles.productImageWrapper} onTouchTap={this.handleClick.bind(null, product, 'product-detail')}>
        <Carousel images={images}/>
        <div onTouchTap={this.showUserProfile.bind(null, seller.id)} style={styles.avatar}>
          <img
            style={styles.avatarImage}
            src={avatarImage}
            alt='avatarImage'
          />
          <span style={styles.sellerName}>
            {seller.get('name')}
          </span>
        </div>
        <div style={styles.productPriceTag}>{product.get('price')}</div>
      </div>
    );
  }
}

export default ProductImage;

