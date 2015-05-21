const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');

let ServerActionCreator = {

  gotProducts (error, products) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_PRODUCTS,
      products: products,
      error: error
    });
  },

  gotFriends (friends) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_FRIENDS,
      friends: friends
    });
  },

  gotProduct (productAssociate) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_PRODUCT,
      productAssociate: productAssociate
    });
  },

  gotProductsRelated (related) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_PRODUCTS_RELATED,
      related: related
    });
  },

  authorized (auth) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.AUTHORIZED,
      auth: auth
    });
  },

  gotOrder (orders) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_ORDER,
      orders: orders
    });
  },

  like (like) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.LIKE,
      like: like
    });
  },

  newData (data) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.NEW_DATA,
      data: data
    });
  },

  productLaunch (product) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.PRODUCT_LAUNCH,
      product: product
    });
  },

  gotMessage (messages) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_MESSAGE,
      messages: messages
    });
  },

  gotOrderMessage (messages) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_ORDER_MESSAGE,
      messages: messages
    });
  },

  gotChat (chatRoomId, chats) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_CHAT,
      chats: chats,
      chatRoomId: chatRoomId
    });
  },

  gotUserProfile (userProfile) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_USER_PROFILE,
      userProfile: userProfile
    });
  },

  sendMsg (chat) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.SEND_MSG,
      chat: chat
    });
  },

  sentMsg (chat) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.SENT_MSG,
      chat: chat
    });
  },

  signUp (user) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.SIGNUP,
      user: user
    });
  },

  signUpError (e) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.SIGNUP_ERROR,
      error: e
    });
  },

  gotAllUsers (users) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_ALL_USERS,
      users: users
    });
  },

  gotVideoProducts (products) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_VIDEO_PRODUCTS,
      products: products
    });
  }

};

module.exports = ServerActionCreator;

