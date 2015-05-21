import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import UserStore from '../stores/UserStore';
import utils from '../util';
import _ from 'lodash';

import superlog from '../util/log';
let log = superlog('ProductStore');

const EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

let State = {};

State.page = 0;
State.products = [];
State.cropImage = [];
State.videoThumbnail = '';
State.videoFilePath = '';
State.friends = [];
State.refreshing = false;
State.cachedProducts = {};
let originData = {
  products: [],
  likes: [],
  comments: []
};

let productsRework = (products) => {
  let reworkedProducts = products.map(product => {
    return {product: product};
  });
  State.products = State.products.concat(reworkedProducts);
};

let relatedRework = (related) => {
  let {likes, comments} = related;
  let mappedLikes = {};
  let mappedComments = {};
  let mappedLiked = {};
  let me = UserStore.getCurrentUser();

  likes.forEach(likeContainer => {
    if (likeContainer.length === 0) return;
    likeContainer.forEach(l => {
      let productId = l.get('likedProduct').id;
      let userId = l.get('likedUser').id;
      if (typeof mappedLikes[productId] === 'undefined') mappedLikes[productId] = [];
      mappedLikes[productId].push(l.get('likedUser'));
      if (me && (me.id === userId)) mappedLiked[productId] = true;
    });
  });

  comments.forEach(commentContainer => {
    if (commentContainer.length === 0) return ;
    commentContainer.forEach(c => {
      let productId = c.get('product').id;
      if (typeof mappedComments[productId] === 'undefined') mappedComments[productId] = [];
      mappedComments[productId].push(c);
    });
  });

  State.products.forEach(productContainer => {
    let productId = productContainer.product.id;
    productContainer.likes = mappedLikes[productId];
    productContainer.comments = mappedComments[productId];
    productContainer.liked = mappedLiked[productId];
  });
};

let like = (likeResult) => {
  log(likeResult);
  State.products.forEach(productContainer => {
    productContainer.product.id === likeResult.get('likedProduct').id
    if (typeof productContainer.likes === 'undefined') productContainer.likes = [];
    productContainer.likes.push(likeResult.get('likedUser'));
    productContainer.liked = true;
  });
};

let unlike = (productContainer) => {
  let myid = UserStore.getCurrentUser().id;
  productContainer.liked = undefined;
  let index = State.products.indexOf(productContainer);
  State.products[index].likes = State.products[index].likes.filter(like => like.id !== myid);
};


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
    if (State.products.length === 0) {
      utils.getProducts();
      return {loading: true};
    } else {
      return {
        products: State.products,
        friends: State.friends
      };
    }
  }

  getProductDetail (id) {
    return State.products.filter(productContainer => {
      return productContainer.product.id === id;
    });
  }

  getProductById (id) {
    let cacheTime = 1000 * 60 * 30; // 30mins
    if (_.isUndefined(State.cachedProducts[id]) || State.cachedProducts[id].fetchedAt + cacheTime < new Date().getTime()) {
      utils.getProductById(id);
      return {
        loading: true
      };
    } else {
      return State.cachedProducts[id];
    }
  }

  getVideoProducts () {
    let cacheTime = 1000 * 60 * 30; // 30mins
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

    case AppConstants.RELATION_USERS:
      log('RELATION_USERS');
      State.friends = action.friends;
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_PRODUCTS:
      log('GOT_PRODUCTS');
      // 先檢查有沒有錯誤
      let {error, products} = action;
      if (error) {
        State.error = error;
        log(error);
      } else {
        productsRework(products);
        productStore.emit(AppConstants.CHANGE_EVENT);
      }
      break;

    case AppConstants.GOT_PRODUCTS_RELATED:
      log('GOT_PRODUCTS_RELATED');
      relatedRework(action.related);
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.FETCH:
      log('FETCH');
      State.page += 1;
      let skip = State.page * 10;
      utils.getProducts(skip, 10);
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_FRIENDS:
      log('GOT_FRIENDS');
      let f = action.friends;
      let friendsAssociated = [];
      f.friends.forEach((friend, index) => {
        let products = f.productsSellByFriends[index];
        if (products.length === 0) return;
        friendsAssociated.push({friend, products});
      });
      State.friends = friendsAssociated;
      productStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_PRODUCT:
      log('GOT_PRODUCT');
      let productId = action.productAssociate.product.id;
      State.cachedProducts[productId] = action.productAssociate;
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
    default:
  }
});

export default productStore;

