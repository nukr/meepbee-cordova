import React from 'react';
import HollowButton from './HollowButton';
import styles from './styles';
import globalStyles from '../styles';
import UserStore from '../../stores/UserStore';

class ProductBrief extends React.Component {
  render () {
    let currentUser = UserStore.getCurrentUser();
    let {product, likes, liked, comments} = this.props.productContainer;
    return (
      <div style={styles.info}>
        <div style={styles.title}>{product.get('title')}</div>

        <div style={styles.wrapper}>
          <div style={{
            marginRight: '10px'
          }}>{(likes && likes.length) || 0} 個人喜歡</div>

          <div>{(comments && comments.length) || 0} 個留言</div>
        </div>

        <div style={styles.btnWrapper}>

          <div style={styles.flexRow}>
            <HollowButton
              style={liked ? styles.likeRedIcon : styles.likeGrayIcon}
              onTouchTap={this.props.onTouchTap.bind(null, this.props.productContainer, 'like')} />
            <HollowButton style={styles.commentIcon} />
          </div>

          <HollowButton
            onTouchTap={this.props.onTouchTap.bind(null, this.props.productContainer.product, 'purchase')}
            style={{background: globalStyles.meepbeeColor, color: 'white'}}>
            購買
          </HollowButton>

        </div>
      </div>
    );
  }
}

export default ProductBrief;

