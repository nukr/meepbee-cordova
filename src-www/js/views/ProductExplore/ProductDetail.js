import React from 'react';
import HollowButton from '../ProductExplore/HollowButton';
import {Panel, PanelHeader} from '../Panels';
import DivHr from '../Components/DivHr';
import styles from './styles';
import UserStore from '../../stores/UserStore';
import action from '../../actions/AppActionCreator';
let m = Object.assign;

import superlog from '../../util/log';
let log = superlog('ProductDetail');

class ProductDetail extends React.Component {
  constructor (props, context) {
    super();
    this.handleLike = (productId) => {
      action.toggleLike(productId)
    };
    this.handleClick = (productId) => {
      context.router.replaceWith(`/products/${productId}`);
    };
    this.handleComment = (productId) => {
      context.router.transitionTo(`/comment/${productId}`);
    }
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    let {product, likes, liked, comments} = this.props.productContainer;
    let {productsSellByUser} = this.props;
    let seller = product && product.get('seller').toJSON();
    productsSellByUser = productsSellByUser.filter(p => p.id !== product.id);

    return (
      <div>
        <Panel>
          <div style={{padding: '10px'}}>
            <div style={styles.title}>{product.get('title')}</div>
            <small style={styles.small}>{product.get('location')}</small>
            <pre style={{wordWrap: 'break-word'}}>{product.get('story')}</pre>
          </div>

          <DivHr />

          <div style={{padding: '10px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <div>
                  <img
                    style={{width: '48px', borderRadius: '24px'}}
                    src={seller.avatarImage ? seller.avatarImage.url : require('../../../assets/elements/img_avatar_nophoto.png')}
                    alt="avatar image" />
                </div>
                <div>{seller.name}</div>
              </div>
              <div>{seller.numberOfProducts}個商品</div>
            </div>
            <div>成為第一個追蹤的人</div>
          </div>
        </Panel>


        <Panel>
          <div style={{padding: '20px'}}>
            <div style={{display: 'flex'}}>
              <HollowButton
                style={m(
                  {flex: 1}
                )}
                onTouchTap={this.handleLike.bind(null, product.id)}>
                {
                  liked
                    ?
                      <img src={require('../../../assets/elements/btn_icon_like_red.png')}/>
                    :
                      <img src={require('../../../assets/elements/btn_icon_like_white.png')}/>
                }
                喜歡
              </HollowButton>
              <HollowButton style={{flex: 1}} onTouchTap={this.handleComment.bind(null, product.id)}>
                <img src={require('../../../assets/elements/btn_icon_message_white.png')}/>
                留言
              </HollowButton>
            </div>
            <div>
              <div style={{marginTop: '7px'}}>{(likes && likes.length) || 0} 個人 <small style={{color: 'lightgray'}}>喜歡這個商品</small></div>
              <div style={{marginTop: '7px'}}>{(comments && comments.length) || 0} 個留言</div>
              <div style={{color: 'lightgray', fontSize: '0.8em', marginTop: '7px'}}>成為第一個留言的人</div>
            </div>
          </div>
        </Panel>

        {
          //<Panel>
            //<div style={{padding: '20px'}}>
              //<a
                //style={{textDecoration: 'none'}}
                //href={`http://meepbee.com/product/${product.id}`}
                //>
                //{`http://meepbee.com/product/${product.id}`}
              //</a>
              //<button>複製此連結</button>
              //<button>檢舉</button>
            //</div>
          //</Panel>
        }

        <PanelHeader>{product.get('seller').get('name')}的其他商品</PanelHeader>
        <Panel>
          <div style={{width: '10000px', display: 'flex', flexFlow: 'row nowrap'}}>
            {productsSellByUser.map(product => <div key={product.id} onTouchTap={this.handleClick.bind(null, product.id)}><img src={product.get('thumbnailImages')[0].url()} style={{width: '25vw'}}/></div>)}
          </div>
        </Panel>

      </div>
    );
  }
}

export default ProductDetail;
