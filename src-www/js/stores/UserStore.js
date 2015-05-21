import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import utils from '../util';
import Immutable from 'immutable';
import splitChatRoomId from '../util/splitChatRoomId';
import {Parse} from 'parse';
import _ from 'lodash';

import { EventEmitter } from 'events'; // 取得一個 pub/sub 廣播器
import superlog from '../util/log';
let log = superlog('UserStore');

let State = {};
State.allUsers = [];
State.loggingIn = false;
State.currentUser = null;
State.sellForm = {};
State.orderMessages = [];
State.messages = [];
State.mappedMsg = {};
State.mappedOrderMsg = {};
State.cachedFollows = {};
State.cachedFans = {};
State.users = [];
State.chats = {};
State.orders = [];
State.mappedOrders = {};
State.buyer = [];
State.seller = [];
State.fans = [];
State.follows = [];
State.signUpStatus = {
  signing: false,
  status: null,
  reason: null
};

let erase = () => {
  State.allUsers = [];
  State.loggingIn = false;
  State.currentUser = null;
  State.sellForm = {};
  State.orderMessages = [];
  State.messages = [];
  State.mappedMsg = {};
  State.mappedOrderMsg = {};
  State.cachedFollows = {};
  State.cachedFans = {};
  State.users = [];
  State.chats = {};
  State.orders = [];
  State.mappedOrders = {};
  State.buyer = [];
  State.seller = [];
  State.fans = [];
  State.follows = [];
  State.signUpStatus = {
    signing: false,
    status: null,
    reason: null
  };
}

State.userProfiles = {};

/**
 * @description
 * Object.assign(obj1, obj2, ...) 把 Object.assign 就是把所有obj2 以後的 Object
 * 都塞進去 obj1 這是 ES6 的 feature 現在必須使用 6to5 這個套件來處理，
 * 我在 webpack.config.js 都有針對這一部分做處理
 *
 * 讓 Store 擁有所有 EventEmitter 的 method
 * 主要是讓他能有 .on .emit 這兩個功能
 */

class UserStore extends EventEmitter {
  getState () {
    return State;
  }

  getChat (chatRoomId) {
    if (State.chats[chatRoomId]) {
      return {
        chats: State.chats[chatRoomId].chats,
        product: State.chats[chatRoomId].product
      }
    } else {
      return {
        loading: true
      };
    }
  }

  getUserProfile (id) {
    let cacheTime = 1000 * 60 * 30; // 30mins
    if (_.isUndefined(State.userProfiles[id]) || State.userProfiles[id].fetchedAt + cacheTime < new Date().getTime()) {
      utils.getUserProfile(id);
      return {
        loading: true
      };
    } else {
      return State.userProfiles[id];
    }
  }

  getAllUsers () {
    if (State.allUsers.length === 0) {
      utils.getAllUsers();
      return {loading: true, users: State.allUsers};
    } else {
      return {users: State.allUsers};
    }
  }

  getFollows (id) {
    if (_.isUndefined(State.cachedFollows[id])) {
      utils.getUserFollows(id);
      return {
        loading: true
      };
    } else {
      return {
        follows: State.cachedFollows[id]
      }
    }
  }

  getFans (id) {
    if (_.isUndefined(State.cachedFans[id])) {
      utils.getUserFans(id);
      return {
        loading: true
      };
    } else {
      return {
        fans: State.cachedFans[id]
      }
    }
  }

  getCurrentUser () {
    return State.currentUser;
  }

  getCurrentChat (id) {
    return State.chats[id];
  }

  getCurrentMessage (id) {
    return State.mappedMsg[id];
  }

  getOrderById (id) {
    return State.mappedOrders[id];
  }

  addChangeListener (callback) {
    this.on(AppConstants.CHANGE_EVENT, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(AppConstants.CHANGE_EVENT, callback);
  }

  erase () {
    State.currentUser = null;
    State.fans = null;
    State.follows = null;
    State.signUpStatus = {
      signing: false,
      status: null,
      reason: null
    };
  }

  resetForm () {
    State.sellForm = {};
  }
}

let userStore = new UserStore();

/**
 * 這邊是接收 Dispatcher 的地方，我們會針對 action.actionType 去 switch
 *
 * dispatchToken 只是一個簡單的 string，記錄著像 ID_1，ID_2 這樣的字串
 * 可以用在 waitFor 裡面，當有兩個以上的 AppDispatcher 註冊這個事件就可以靠這個 Token
 * 安排順序
 */
userStore.dispatchToken = AppDispatcher.register(function eventHandlers (evt) {

  var action = evt.action;

  switch (action.actionType) {

    case AppConstants.SAVE_SELL_FORM:
      log('SAVE_SELL_FORM');
      State.sellForm = action.state;
      break;

    case AppConstants.LOGIN:
      log('LOGIN');
      if (evt.source === AppConstants.SOURCE_VIEW_ACTION) {
        State.loggingIn = true;
      } else {
        if (action.result.code) {
          State.err = action.result;
        } else {
          State.currentUser = action.result;
        }
        State.loggingIn = false;
      }
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.LOGOUT:
      log('LOGOUT');
      if (evt.source === AppConstants.SOURCE_VIEW_ACTION) {
        State.loggingOut = true;
      } else {
        userStore.erase();
        State.loggingOut = false;
      }
      erase();
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.NEW_PAYMENT:
      log('NEW_PAYMENT');
      State.currentUser.get('payments').push(action.payment);
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.NEW_SHIPPING:
      log('NEW_SHIPPING');
      State.currentUser.get('shippings').push(action.shipping);
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_ORDER:
      log('GOT_ORDER');
      State.buyer = action.orders.buyerResults;
      State.seller = action.orders.sellerResults;
      State.buyer.forEach(order => State.mappedOrders[order.id] = order);
      State.seller.forEach(order => State.mappedOrders[order.id] = order);
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_MESSAGE:
      log('GOT_MESSAGE');
      State.messages = action.messages;
      action.messages.forEach(msg => State.mappedMsg[msg.get('chatRoomId')] = msg);
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_ORDER_MESSAGE:
      log('GOT_ORDER_MESSAGE');
      State.orderMessages = action.messages;
      action.messages.forEach(msg => State.mappedMsg[msg.get('chatRoomId')] = msg);
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_CHAT:
      log('GOT_CHAT');
      State.chats[action.chatRoomId] = {
        chats: action.chats,
        product: action.product
      };
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_USER_PROFILE:
      log('GOT_USER_PROFILE');
      State.userProfiles[action.userProfile.user.id] = action.userProfile;
       userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.SEND_MSG:
      log('SEND_MSG');
      let {chatRoomId, msg, product} = action;
      let {buyerId, productId, sellerId} = splitChatRoomId(chatRoomId);
      let seller = new Parse.User()
      seller.id = sellerId;
      let buyer = new Parse.User()
      buyer.id = buyerId;
      let Chats = Parse.Object.extend('Chats');
      let chat = new Chats();
      let Messages = Parse.Object.extend('Messages');
      if (State.chats[chatRoomId].chats.length === 0) {
        let message1 = new Messages();
        message1.set('chatRoomId', chatRoomId)
        message1.set('counter', 0)
        message1.set('description', product.get('title'))
        message1.set('lastMessage', msg)
        message1.set('lastUser', State.currentUser)
        message1.set('product', product)
        message1.set('seller', seller)
        message1.set('buyer', buyer)
        message1.set('user', seller)
        message1.set('updatedAction', new Date())

        let message2 = new Messages();
        message2.set('chatRoomId', chatRoomId)
        message2.set('counter', 0)
        message2.set('description', product.get('title'))
        message2.set('lastMessage', msg)
        message2.set('lastUser', State.currentUser)
        message2.set('product', product)
        message2.set('seller', seller)
        message2.set('buyer', buyer)
        message2.set('user', buyer)
        message2.set('updatedAction', new Date())
        message1.save();
        message2.save();
      } else {
        utils.updateMessage(chatRoomId, msg);
      }

      chat.set('chatRoomId', chatRoomId)
      chat.set('user', State.currentUser)
      chat.set('text', msg)
      chat.save();

      State.chats[chatRoomId].chats.push(chat);
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.SENT_MSG:
      log('SENT_MSG');
      let chat = State.chats[action.chat.get('chatRoomId')];
      chat[chat.length - 1] = action.chat;
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.AUTHORIZED:
      log('AUTHORIZED');
      State.currentUser = action.auth;
      // userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.SIGNUP:
      log('SIGNUP');
      if (evt.source === AppConstants.SOURCE_VIEW_ACTION) {
        State.signUpStatus.signingUp = true;
      } else {
        console.log(action.result);
        if (action.result.code) {
          if (action.result.code === 203) {
            State.signUpStatus.reason = '此email已被使用';
          } else {
            State.signUpStatus.reason = '發生錯誤，請稍候再試';
          }
          State.signUpStatus.signingUp = false;
          State.signUpStatus.status = 'error';
        } else {
          State.signUpStatus.signingUp = false;
          State.signUpStatus.status = 'success';
          State.currentUser = action.result;
        }
      }
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.TOGGLE_FOLLOW:
      log('TOGGLE_FOLLOW');
      if (evt.source === AppConstants.SOURCE_VIEW_ACTION) {
        let user = action.user;
        let userProfile = State.userProfiles[user.id];
        if (userProfile.isFollowed) {
          userProfile.fans = userProfile.fans.filter(fan => fan.id !== State.currentUser.id);
          userProfile.isFollowed = false;
        } else {
          userProfile.fans.push(State.currentUser);
          userProfile.isFollowed = true;
        }
      } else {
      }
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.GOT_ALL_USERS:
      log('GOT_ALL_USERS');
      State.allUsers = action.users;
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;

    case AppConstants.DELETE_PAYMENT: {
      log('DELETE_PAYMENT');
      let {indexOfPayment} = action;
      let removed = State.currentUser.get('payments').splice(indexOfPayment, 1);
      utils.updateCurrentUser();
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;
    }

    case AppConstants.DELETE_SHIPPING: {
      log('DELETE_SHIPPING');
      let {indexOfShipping} = action;
      let removed = State.currentUser.get('shippings').splice(indexOfShipping, 1);
      utils.updateCurrentUser();
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;
    }

    case AppConstants.GOT_FOLLOWS: {
      log('GOT_FOLLOWS');
      let {follows, id} = action;
      State.cachedFollows[id] = follows;
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;
    }

    case AppConstants.GOT_FANS: {
      log('GOT_FANS');
      let {fans, id} = action;
      State.cachedFans[id] = fans;
      userStore.emit(AppConstants.CHANGE_EVENT);
      break;
    }
    default:

  }
});

export default userStore;
