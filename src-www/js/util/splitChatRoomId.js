let splitChatRoomId = (chatRoomId) => {
  /**
   * chatRoomId 是一個長度30的字串，每10個一組，依序是 buyerId, productId, sellerId，
   * 這隻function的目的就是將chatRoomId分割成三組回傳
   * @param {string} chatRoomId
   * @returns {object}
   *
   */
  let buyerId = chatRoomId.substring(0, 10);
  let productId = chatRoomId.substring(10, 20);
  let sellerId = chatRoomId.substring(20, 30);
  return {buyerId, productId, sellerId};
}

export default splitChatRoomId
