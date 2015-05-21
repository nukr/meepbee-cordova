let log = (...args) => {
  console.log('[queryHelper]', ...args);
};

class queryHelper {
  constructor (Parse) {
    this.Parse = Parse;
  }

  async getFollows (user) {
    let Follows = this.Parse.Object.extend('Follows');
    let followsQuery = new this.Parse.Query(Follows);
    followsQuery.equalTo('from', user);
    let follows = await followsQuery.find();
    follows = follows.map(follow => follow.get('toUser'));
    return follows;
  }

  async getFans (user) {
    let Follows = this.Parse.Object.extend('Follows');
    let fansQuery = new this.Parse.Query(Follows);
    fansQuery.equalTo('toUser', user);
    let fans = await fansQuery.find();
    fans = fans.map(fan => fan.get('from'));
    return fans;
  }

  getProductsSaleByUser(user) {
    let Products = this.Parse.Object.extend('Products');
    let productsQuery = new this.Parse.Query(Products);
    let products = productsQuery
      .equalTo('seller', user)
      .find();
    return products;
  }

  async getFriends (user) {
    return await user.relation('friendsRelation').query().find();
  }

  getLikes (product) {
    let Likes = this.Parse.Object.extend('Likes');
    let likesQuery = new this.Parse.Query(Likes);
    return likesQuery.equalTo('likedProduct', product).find();
  }

  getComments (product) {
    let Comments = this.Parse.Object.extend('Comments');
    let commentsQuery = new this.Parse.Query(Comments);
    commentsQuery.equalTo('product', product);
    commentsQuery.include('commenter');
    return commentsQuery.find();
  }

  getBuyerOrders (user) {
    let Orders = this.Parse.Object.extend('Orders');
    let query = new this.Parse.Query(Orders);
    return query.include('buyer').equalTo('buyer', user).find();
  }

  getSellerOrders (user) {
    let Orders = this.Parse.Object.extend('Orders');
    let query = new this.Parse.Query(Orders);
    return query.include('buyer').equalTo('seller', user).find();
  }

  getProductById (id) {
    let Products = this.Parse.Object.extend('Products');
    let query = new this.Parse.Query(Products);
    query.include('seller');
    return query.get(id);
  }

  getProducts (skip, limit) {
    let Products = this.Parse.Object.extend('Products');
    let query = new this.Parse.Query(Products);
    query
      .skip(skip)
      .include('seller')
      .descending('createdAt')
      .limit(limit);
    return query.find();
  }

  async getProductsRelated (products) {
    let likes = products.map(product => this.getLikes(product));
    likes = await Promise.all(likes);
    let comments = products.map(product => this.getComments(product));
    comments = await Promise.all(comments);
    return {likes, comments};
  }

  getMessages (chatRoomId) {
    let Messages = Parse.Object.extend('Messages');
    let query = new Parse.Query(Messages);
    query.equalTo('chatRoomId', chatRoomId);
    return query.find();
  }

  getChat (chatRoomId) {
  }
}

export default queryHelper;
