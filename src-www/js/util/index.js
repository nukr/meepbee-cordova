import sa from 'superagent';
import serverAction from '../actions/ServerActionCreator';
import viewAction from '../actions/AppActionCreator';
import userStore from '../stores/UserStore';
import queryHelper from './queryHelper';
import normalizePhoneNumber from './normalizePhoneNumber';
import splitChatRoomId from './splitChatRoomId';
import superlog from './log';
import Parse from './parse-init';
let log = superlog('utils');






let productCounter = 0;
let qh = new queryHelper(Parse);
let alert2 = (msg) => {
  if (navigator.notification) {
    navigator.notification.alert(msg);
  } else {
    alert(msg);
  }
};

let Util = {};

Util.authorize = async (...cert) => {
  let authorized;
  let token = localStorage.getItem('token');
  if (cert.length === 2) {
    let [username, password] = cert;
    try {
      authorized = await Parse.User.logIn(username, password);
    } catch (e) {
      return e;
    }
    localStorage.setItem('token', authorized.getSessionToken());
    return authorized;
  } else if (token) {
    return await Parse.User.become(token);
  } else {
    return false;
  }
};

Util.getProductById = async (id) => {
  let productContainer = await Parse.Cloud.run('getProductById', {productId: id});
  serverAction.gotProduct(productContainer);
}

Util.getProductsSellByUser = async (user) => {
  let productsSellByUser = await qh.getProductsSaleByUser(user)
  serverAction.gotProductsSellByUser(productsSellByUser, user.id);
}

Util.login = async (cert) => {
  let auth = await Util.authorize(cert.username, cert.password);
  if (typeof parsePlugin !== 'undefined') {
    parsePlugin.getInstallationId(async (id) => {
      let install = new Parse.Query(Parse.Installation);
      install.equalTo('installationId', id);
      let result = await install.first();
      sa
        .put(`https://api.parse.com/1/installations/${result.id}`)
        .set('X-Parse-REST-API-Key', restAPIKey)
        .set('X-Parse-Application-Id', appId)
        .set('Content-Type', 'application/json')
        .send(`{"appIdentifier": "com.meepshop.meepBEE", "user": {"__type": "Pointer", "className": "_User", "objectId": "${Parse.User.current().id}"}}`)
        .end();
    });
  }
  return auth;
};

Util.logout = async () => {
  localStorage.clear();
  await Parse.User.logOut();
};

Util.getOrders = async () => {
  let buyerResults = await qh.getBuyerOrders(Parse.User.current());
  let sellerResults = await qh.getSellerOrders(Parse.User.current());
  serverAction.gotOrder({buyerResults, sellerResults});
};

Util.like = async (product) => {
  let Likes = Parse.Object.extend('Likes');
  let likes = new Likes();
  let result;
  likes.set('likedProduct', product);
  likes.set('likedUser', Parse.User.current());
  result = await likes.save();
  return result;
};

Util.unlike = async (product) => {
  let Likes = Parse.Object.extend('Likes');
  let likesQuery = new Parse.Query(Likes);
  likesQuery.equalTo('likedProduct', product);
  likesQuery.equalTo('likedUser', Parse.User.current());
  let like = await likesQuery.first();
  like.destroy();

};

Util.updateCurrentUser = async () => {
  let result = await Parse.User.current().save();
};

Util.productLaunch = async (productInfo) => {
  let requests = productInfo.imgArr.map((img, index) => {
    let commaPos = img.indexOf(',');
    let base64Img = img.substr(commaPos + 1);
    return new Parse.File(`productImage${index}.png`, {base64: base64Img}).save();
  });
  let files = await Promise.all(requests);
  let resolveFilePromise = (fullPath) => {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(fullPath, (entry) => {
        resolve(entry);
      }, (err) => {
        reject(err);
      });
    });
  };
  let genFile = (fileEntry) => {
    return new Promise((resolve, reject) => {
      fileEntry.file(resolve, reject);
    });
  };
  let videoEntry = await resolveFilePromise(productInfo.video);
  let videoFile = await genFile(videoEntry);
  let parseVideoFile = new Parse.File('video.mp4', videoFile);
  let uploadedVideo = await parseVideoFile.save();
  let prePost = {
    title: productInfo.formData.title,
    price: 'NT$' + productInfo.formData.price,
    priceInteger: parseInt(productInfo.formData.price.replace(/\D/g, ''), 10),
    story: productInfo.formData.story,
    quantity: parseInt(productInfo.formData.quantity),
    location: productInfo.formData.location,
    images: [for (file of files) {name: file._name, url: file._url, __type: 'File'}],
    thumbnailImages: [for (file of files) {name: file._name, url: file._url, __type: 'File'}],
    locale: 'zh_TW',
    payments: productInfo.payments,
    shippings: productInfo.shippings,
    seller: Parse.User.current(),
    video: uploadedVideo
  };
  let Product = Parse.Object.extend('Products');
  let product = new Product();
  let result = await product.save(prePost);
  return result;
};

Util.deleteInproper = async () => {
  let Products = Parse.Object.extend('Products');
  let query = new Parse.Query(Products);
  query.equalTo('seller', Parse.User.current());
  query.equalTo('inproper', true);
  let results = await query.find();
  results.forEach(r => {
    r.destroy();
  });
};

Util.getMessage = async () => {
  let Messages = Parse.Object.extend('Messages');
  let messagesQuery = new Parse.Query(Messages);
  messagesQuery
    .include('product')
    .include('seller')
    .include('lastUser')
    .descending('updatedAction')
    .equalTo('user', Parse.User.current());
  let messages = await messagesQuery.find();
  serverAction.gotMessage(messages);
};

Util.getOrderMessage = async () => {
  let OrderMessages = Parse.Object.extend('OrderMessages');
  let orderMessagesQuery = new Parse.Query(OrderMessages);
    orderMessagesQuery
      .include('order')
      .include('seller')
      .include('lastUser')
      .equalTo('user', Parse.User.current());
  let messages = await orderMessagesQuery.find();
  serverAction.gotOrderMessage(messages);
};

Util.getChat = async (chatRoomId) => {
  let {buyerId, productId, sellerId} = splitChatRoomId(chatRoomId);

  let Products = Parse.Object.extend('Products');
  let productQuery = new Parse.Query(Products);
  let product = await productQuery.get(productId);

  let Chats = Parse.Object.extend('Chats');
  let chatsQuery = new Parse.Query(Chats);
  chatsQuery
    .equalTo('chatRoomId', chatRoomId)
    .include('user');
  let chats = await chatsQuery.find();
  serverAction.gotChat(chatRoomId, chats, product);
};

Util.getUser = async () => {
  let query = new Parse.Query(Parse.User);
  query.limit(1000);
  query.exists('avatarImage');
  query.descending('createdAt');
  let users = await query.find();
  serverAction.gotUser(users);
};

Util.sendMsg = async (chatRoomId, msg, oppo) => {
  let Chats = Parse.Object.extend('Chats');
  let chat = new Chats();
  chat.set('chatRoomId', chatRoomId);
  chat.set('text', msg);
  chat.set('user', Parse.User.current());
  serverAction.sendMsg(chat);
  chat = await chat.save();
  serverAction.sentMsg(chat);
  let query = new Parse.Query(Parse.Installation);
  query.equalTo('user', oppo);
  let push = await Parse.Push.send({
    where: query,
    data: {
      'alert': msg,
      'badge': 'Increment',
      'content-available': 1,
      'title': msg
    }
  });
  let Messages = Parse.Object.extend('Messages');
  let msgquery = new Parse.Query(Messages);
  msgquery.equalTo('chatRoomId', chatRoomId);
  let messages = await msgquery.find();
  messages.forEach(message => {
    message.set('lastMessage', msg);
    message.set('lastUser', Parse.User.current());
    message.save();
  });
};

Util.createOrder = async (data) => {
  let Products = Parse.Object.extend('Products');
  let productQuery = new Parse.Query(Products);
  let product = await productQuery.get(data.orderForm.product.objectId);
  let qty = product.get('quantity');
  product.set('quantity', qty - data.orderForm.quantity);
  let productResult = await product.save();
  let Orders = Parse.Object.extend('Orders');
  let order = new Orders();
  order.set(data);
  let result = await order.save();
};

Util.refresh = async () => {
  let payload = {};
  payload.products = await queryProducts();
  payload.likes = await queryLikes(payload.products);
  payload.comments = await queryComments(payload.products);
  return payload;
};

Util.pushInit = () => {
  if (typeof parsePlugin !== 'undefined') {
    parsePlugin.initialize(appId, clientKey);
  }
};

Util.signup = async (form) => {
  let user = new Parse.User();
  let name = form.email.substr(0, form.email.indexOf('@'));
  user.set('username', form.email);
  user.set('name', name);
  user.set('email', form.email);
  user.set('password', form.password);
  user.set('mobile', form.mobile);
  user.set('shippings', [{'fee': 0, 'selected': false, 'shippingWay': '面交'}, {'fee': 0, 'selected': false, 'shippingWay': '郵寄'}, {'fee': 0, 'selected': false, 'shippingWay': '貨到付款'}]);
  user.set('payments', [{'description': '', 'selected': false, 'tradingWay': '面交'}, {'description': '', 'selected': false, 'tradingWay': 'ATM轉帳'}, {'description': '', 'selected': false, 'tradingWay': '貨到付款'}]);
  try {
    var currentUser = await user.signUp();
  } catch (e) {
    return e;
  }
  localStorage.setItem('token', currentUser.getSessionToken());
  return currentUser;
};

Util.getContactsNumberAndRebuildFriendsRelation = async () => {
  if (typeof cordova !== 'undefined') {
    let numbers = await getNumbersInContacts();
    let result = await Util.findFriendByPhones(numbers);
  }
};

let getNumbersInContacts = async () => {
  let contacts = await getContacts();
  let numbers = [];
  contacts.forEach(contact => {
    if (typeof contact.phoneNumbers !== 'undefined' && contact.phoneNumbers !== null) {
      contact.phoneNumbers.forEach(phone => numbers.push(normalizePhoneNumber(phone.value)));
    }
  });
  return numbers;
};

let getContacts = () => {
  return new Promise((resolve, reject) => {
    let options = new ContactFindOptions();
    let fields = [navigator.contacts.fieldType.displayName];
    options.desiredFields = [
      navigator.contacts.fieldType.id,
      navigator.contacts.fieldType.phoneNumbers,
      navigator.contacts.fieldType.displayName,
      navigator.contacts.fieldType.name
    ];
    options.filter = '';
    options.multiple = true;
    navigator.contacts.find(fields, resolve, reject, options);
  });
};

Util.findFriendByPhones = async (phones) => {
  log('findFriendByPhones');
  return new Promise((success, error) => {
    Parse.Cloud.run('findFriendByPhones', {phones: phones}, {success, error});
  });
};

Util.getUserProfile = async (id) => {
  let me = Parse.User.current();
  let userQuery = new Parse.Query(Parse.User);
  let user = await userQuery.get(id);
  let follows = await qh.getFollows(user);
  let fans = await qh.getFans(user);
  let products = await qh.getProductsSaleByUser(user);
  let isFollowed = fans.some(fan => fan.id === me && me.id);
  let fetchedAt = new Date().getTime();
  serverAction.gotUserProfile({user, fans, follows, products, isFollowed, fetchedAt});
};

Util.toggleFollow = async (user) => {
  let me = Parse.User.current();
  let Follows = Parse.Object.extend('Follows');
  let followsQuery = new Parse.Query(Follows);
  followsQuery.equalTo('from', me);
  followsQuery.equalTo('toUser', user);
  let result = await followsQuery.first();
  log(result);
   if (result) {
     result.destroy();
   } else {
    let newFollows = new Follows();
    newFollows.set('from', me).set('toUser', user).save();
   }
};

Util.getAllUsers = async () => {
  let query = new Parse.Query(Parse.User);
  query.limit(1000);
  query.exists('avatarImage');
  query.descending('updatedAt');
  serverAction.gotAllUsers(await query.find());
}

Util.getVideoProducts = async () => {
  let Products = Parse.Object.extend('Products');
  let query = new Parse.Query(Products);
  query.exists('video');
  serverAction.gotVideoProducts(await query.find());
}

Util.getComments = async (id) => {
  let Comments = Parse.Object.extend('Comments');
  let Products = Parse.Object.extend('Products');
  let query = new Parse.Query(Comments);
  let product = new Products();
  product.id = id;
  query.equalTo('product', product);
  query.include('commenter');
  query.descending('createdAt');
  serverAction.gotComments(await query.find(), id);
}

Util.getUserFollows = async (id) => {
  let follows = await qh.getFollows(id);
  serverAction.gotFollows(follows, id);
}

Util.getUserFans = async (id) => {
  let fans = await qh.getFans(id);
  serverAction.gotFans(fans, id);
}

Util.getProductWithRelated = async (skip = 0) => {
  let limit = 10;
  try {
    let result = await Parse.Cloud.run('productWithRelated', {skip, limit});
    serverAction.gotProducts(result);
  } catch (e) {
  }
}

Util.getFriendWithRelated = async () => {
  let result = await Parse.Cloud.run('friendWithRelated');
  serverAction.gotFriends(result);
}

Util.getProductAndFriend = async () => {
  await Util.getProductWithRelated();
  Util.getFriendWithRelated();
}

Util.getProductsByUser = async (userId) => {
  let products = await Parse.Cloud.run('getProductsByUser', {userId: userId});
}

Util.updateMessage = async (chatRoomId, msg) => {
  let Messages = Parse.Object.extend('Messages')
  let messageQuery = new Parse.Query(Messages);
  let messages = await messageQuery.equalTo('chatRoomId', chatRoomId).find();

  let messagesPromises = messages.map(message => {
    message.set('lastMessage', msg)
    message.set('lastUser', Parse.User.current())
    message.set('updatedAction', new Date())
    return message.save();
  });
}

export default Util;
