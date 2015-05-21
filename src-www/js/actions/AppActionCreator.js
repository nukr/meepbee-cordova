import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import util from '../util';
import superlog from '../util/log';
let log = superlog('ViewAction');

let AppActionCreators = {

  async init () {
    let auth = await util.authorize();
    AppDispatcher.handleServerAction({
      actionType: AppConstants.AUTHORIZED,
      auth: auth
    });
  },

  saveSellForm (state) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SAVE_SELL_FORM,
      state: state
    });
  },

  saveVideo (videoFilePath, image64, video2) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SAVE_VIDEO,
      videoData: {videoFilePath, image64, video2}
    });
  },

  animation (animation) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ANIMATION,
      items: animation
    });
  },

  productDetail (product) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.PRODUCT_DETAIL,
      items: product
    });
  },

  async like (productContainer) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LIKE,
      productContainer: productContainer
    });
    let result = await util.like(productContainer.product);
    AppDispatcher.handleServerAction({
      actionType: AppConstants.LIKE,
      result: result
    });
  },

  unlike (productContainer) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UNLIKE,
      productContainer: productContainer
    });
    util.unlike(productContainer.product);
  },

  async login (cert) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOGIN
    });
    let result = await util.authorize(cert.username, cert.password);
    AppDispatcher.handleServerAction({
      actionType: AppConstants.LOGIN,
      result: result
    });
    util.getContactsNumberAndRebuildFriendsRelation();
  },

  async logout () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOGOUT
    });
    await util.logout();
    AppDispatcher.handleServerAction({
      actionType: AppConstants.LOGOUT
    });
  },

  fetch () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.FETCH
    });
  },

  newPayment (payment) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NEW_PAYMENT,
      payment: payment
    });
    util.updateCurrentUser();
  },

  newShipping (shipping) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NEW_SHIPPING,
      shipping: shipping
    });
    util.updateCurrentUser();
  },

  saveImage (imageData, imageNum) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SAVE_IMAGE,
      image: imageData,
      num: imageNum
    });
  },

  cropImage (imageData) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CROP_IMAGE,
      image: imageData
    });
  },

  async productLaunch (product) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.PRODUCT_LAUNCH
    });
    let data = await util.productLaunch(product);
    AppDispatcher.handleServerAction({
      actionType: AppConstants.PRODUCT_LAUNCH,
      data: data
    });
  },

  deleteInproper () {
    util.deleteInproper();
  },

  getOrders () {
    util.getOrders();
  },

  getMessage () {
    util.getMessage();
    util.getOrderMessage();
  },

  getUser () {
    util.getUser();
  },

  getChat (id) {
    util.getChat(id);
  },

  sendMsg (chatRoomId, msg, oppo) {
    util.sendMsg(chatRoomId, msg, oppo);
  },

  createOrder (order) {
    util.createOrder(order);
  },

  async refresh () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REFRESH
    });
  },

  async signup (form) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SIGNUP
    });
    let result = await util.signup(form);
    AppDispatcher.handleServerAction({
      actionType: AppConstants.SIGNUP,
      result: result
    });
  },

  async cloudtest () {
    log('action.cloudtest');
    let arr  = [];
    for (var i=0; i < 1000; ++i) {
      if (i % 2) {
        arr.push('0917-890-899');
      } else {
        arr.push('0961-007-003');
      }
    }
    let result = await util.cloudtest(arr);
    log(result);
  },

  async findRelation () {
    let users = await util.findRelation();
    AppDispatcher.handleServerAction({
      actionType: AppConstants.RELATION_USERS,
      users: users
    });
  },

  async toggleFollow (user) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.TOGGLE_FOLLOW,
      user: user
    });
    util.toggleFollow(user);
    // AppDispatcher.handleServerAction({
    //   actionType: AppConstants.TOGGLE_FOLLOW,
    //   user: toggled
    // });
  },

  emitChange () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.EMIT_CHANGE
    });
  },

  deletePayment (indexOfPayment) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DELETE_PAYMENT,
      indexOfPayment: indexOfPayment
    });
  },

  deleteShipping (indexOfShipping) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DELETE_SHIPPING,
      indexOfShipping: indexOfShipping
    });
  }
};

module.exports = AppActionCreators;