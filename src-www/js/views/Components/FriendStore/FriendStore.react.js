import React, {Component} from 'react';

class FriendStore extends Component {
  static get propTypes () {
    return {
      goUserProfile: React.PropTypes.func,
      friend: React.PropTypes.any,
      products: React.PropTypes.any
    };
  }
  render () {
    let {friend, products} = this.props;
    return (
      <div style={{marginBottom: '20px'}} onTouchTap={this.props.goUserProfile}>
        <FriendInfo friend={friend} numberOfProduct={products.length}/>
        <FriendProducts products={products} />
      </div>
    );
  }
}

class FriendInfo extends Component {
  static get propTypes () {
    return {
      friend: React.PropTypes.any,
      numberOfProduct: React.PropTypes.number
    };
  }
  render () {
    let {friend, numberOfProduct} = this.props;
    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex'}}>
          <div>
            <img src={friend.get('avatarImage').url()} style={{width: '36px', borderRadius: '18px'}}/>
          </div>
          <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', color: 'lightgray'}}>
            {friend.get('name')}
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', color: 'lightgray', fontSize: '0.8em'}}>
          {numberOfProduct} 個商品
        </div>
      </div>
    )
  }
}

class FriendProducts extends Component {
  static get propTypes () {
    return {
      products: React.PropTypes.array
    };
  }

  render () {
    let {products} = this.props;
    return (
      <div style={{width: '10000px'}}>
        {
          products.map(product => {
            return (
              <img
                key={product.id}
                src={product.get('thumbnailImages')[0].url()}
                style={{width: '25vw', height: '25vw'}}
              />
            )
          })
        }
      </div>
    );
  }
}
export default FriendStore;
