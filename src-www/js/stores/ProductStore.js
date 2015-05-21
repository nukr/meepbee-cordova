import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import UserStore from '../stores/UserStore';
import utils from '../util';
import Parse from '../util/parse-init.js'
import _ from 'lodash';

import superlog from '../util/log';
let log = superlog('ProductStore');

const EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

let State = {};

State.products = [];
State.cropImage = [];
State.videoThumbnail = '';
State.videoFilePath = '';
State.friends = [];
State.refreshing = false;
State.cachedComments = {};
State.productsSellByUser = {};

let erase = () => {
  State.products = [];
  State.cropImage = [];
  State.videoThumbnail = '';
  State.videoFilePath = '';
  State.friends = [];
  State.refreshing = false;
  State.cachedComments = {};
  State.productsSellByUser = {};
}

/**
 * @description
 * 讓 Store 擁有所有 EventEmitter 的 method
 * 主要是讓他能有 .on .emit 這兩個功能
 */
class ProductStore extends EventEmitter {

  getState () {
    return State;
  }

  getProducts () {
    if (State.products.filter(productContainer => productContainer.category === 'main').length === 0) {
      utils.getProductAndFriend();
      return {loading: true};
    } else {
      return {
        loading: false,
        products: State.products.filter(productContainer => productContainer.category === 'main'),
        friends: State.friends,
        scrollTop: State.productContainerScrollTop
      };
    }
  }

  getProductById (id) {
    let foundProduct = null;
    State.products.forEach(productContainer => {
      if (productContainer.product.id === id) foundProduct = productContainer
    })
    if (foundProduct) {
      let sellerId = foundProduct.product.get('seller').id;
      if (!State.productsSellByUser[sellerId]) utils.getProductsSellByUser(foundProduct.product.get('seller'))
      return {
        productContainer: foundProduct,
        productsSellByUser: State.productsSellByUser[sellerId]
      }
    } else {
      utils.getProductById(id);
      return {
        loading: true
      }
    }
  }

  getVideoProducts () {
    if (_.isUndefined(State.videoProducts)) {
      utils.getVideoProducts();
      return {
        loading: true
      };
    } else {
      return {
        products: State.videoProducts
      }
    }
  }

  getComments (id) {
    if (_.isUndefined(State.cachedComments[id])) {
      utils.getComments(id);
      return {
        loading: true
      };
    } else {
      return {
        comments: State.cachedComments[id]
      }
    }
  }

  set productContainerScrollTop (px) {
    State.productContainerScrollTop = px;
  }

  addChangeListener (callback) {
    this.on(AppConstants.CHANGE_EVENT, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(AppConstants.CHANGE_EVENT, callback);
  }

}

let productStore = new ProductStore();

/**
 * 這邊是接收 Dispatcher 的地方，我們會針對 action.actionType 去 switch
 *
 * dispatchToken 只是一個簡單的 string，記錄著像 ID_1，ID_2 這樣的字串
 * 可以用在 waitFor 裡面，當有兩個以上的 AppDispatcher 註冊這個事件就可以靠這個 Token
 * 安排順序
 */
productStore.dispatchToken = AppDispatcher.register(function eventHandlers (evt) {

  let action = evt.action;
  let source = evt.source;

  switch (action.actionType) {

    case AppConstants.LIKE:
      log('LIKE');
      if (evt.source === AppConstants.SOURCE_VIEW_ACTION) {
        action.productContainer.liked = true;
      } else {
        like(action.result);
      }
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.UNLIKE:
      log('UNLIKE');
      unlike(action.productContainer);
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.SAVE_IMAGE:
      log('SAVE_IMAGE');
      State.savedImage = action.image;
      State.editingImageNum = action.num;
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.CROP_IMAGE:
      log('CROP_IMAGE');
      State.cropImage[State.editingImageNum] = action.image;
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.PRODUCT_LAUNCH:
      log('PRODUCT_LAUNCH');
      if (evt.source === AppConstants.SOURCE_VIEW_ACTION) {
        State.productLaunching = true;
      } else {
        State.products.unshift({content: action.data});
        State.productLaunching = false;
        State.cropImage = [];
        State.savedImage = null;
        State.videoFilePath = '';
        State.videoThumbnail = '';
        UserStore.resetForm();
      }
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.REFRESH:
      log('REFRESH');
      if (evt.source === AppConstants.SOURCE_VIEW_ACTION) {
        State.products = [];
      }
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;


    case AppConstants.LOGOUT:
      log('LOGOUT');
      erase()
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.LOGIN:
      log('LOGIN');
      erase()
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.SAVE_VIDEO:
      log('SAVE_VIDEO');
      State.videoFilePath = action.videoData.videoFilePath;
      State.video2 = action.videoData.video2;
      let videoThumbnail = 'data:image/png;base64,' + action.videoData.image64;
      let img = new Image();
      let canvas = document.createElement('canvas');
      img.src = videoThumbnail;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalWidth;
      let canvasContext = canvas.getContext('2d');
      canvasContext.drawImage(
        img,
        0, 0, canvas.width, canvas.height
      );
      State.videoThumbnail = canvas.toDataURL();
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_PRODUCTS:
      log('GOT_PRODUCTS');
      State.products = State.products.concat(action.products);
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_FRIENDS:
      log('GOT_FRIENDS');
      State.friends = action.friends;
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_PRODUCT:
      log('GOT_PRODUCT');
      State.products.push(action.productContainer);
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_PRODUCTS_SELL_BY_USER:
      log('GOT_PRODUCTS_SELL_BY_USER');
      State.productsSellByUser[action.userId] = action.productsSellByUser;
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.EMIT_CHANGE:
      log('EMIT_CHANGE');
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_VIDEO_PRODUCTS:
      log('GOT_VIDEO_PRODUCTS');
      State.videoProducts = action.products;
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_COMMENTS:
      log('GOT_COMMENTS');
      let {comments, id} = action;
      State.cachedComments[id] = comments;
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.SEND_COMMENT:
      log('SEND_COMMENT');
      let {comment, id} = action;
      if (evt.source === AppConstants.SOURCE_VIEW_ACTION) {
        if (_.isUndefined(State.cachedComments[id])) State.cachedComments[id] = [];
        State.cachedComments[id].unshift(comment);
      }
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.TOGGLE_LIKE:
      log('TOGGLE_LIKE');
      let {productId} = action;
      let foundProductContainer = null;
      State.products.forEach(productContainer => {
        if (productContainer.product.id === productId) {
          foundProductContainer = productContainer;
        }
      });
      if(foundProductContainer.liked) {
        let removed = _.remove(foundProductContainer.likes, (like) => {
          return like.get('likedUser').id === UserStore.getCurrentUser().id
        });
        foundProductContainer.liked = false;
        log(removed)
        removed.forEach(item => item.destroy());
      } else {
        let Likes = Parse.Object.extend('Likes');
        let like = new Likes();
        like.set('likedProduct', foundProductContainer.product);
        like.set('likedUser', UserStore.getCurrentUser());
        foundProductContainer.likes.push(like);
        foundProductContainer.liked = true;
        like.save();
      }
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;
    default:
  }
});

export default productStore;

