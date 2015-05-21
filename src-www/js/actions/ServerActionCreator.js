const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');

let ServerActionCreator = {

  gotProducts (products) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_PRODUCTS,
      products: products
    });
  },

  gotFriends (friends) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_FRIENDS,
      friends: friends
    });
  },

  gotProduct (productContainer) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_PRODUCT,
      productContainer: productContainer
    });
  },

  gotProductsSellByUser (productsSellByUser, userId) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_PRODUCTS_SELL_BY_USER,
      productsSellByUser: productsSellByUser,
      userId: userId
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

  gotChat (chatRoomId, chats, product) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_CHAT,
      chats: chats,
      chatRoomId: chatRoomId,
      product: product
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
  },

  gotComments (comments, id) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_COMMENTS,
      comments: comments,
      id: id
    });
  },

  gotFollows (follows, id) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_FOLLOWS,
      follows: follows,
      id: id
    });
  },

  gotFans (fans, id) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.GOT_FANS,
      fans: fans,
      id: id
    });
  }

};

module.exports = ServerActionCreator;

