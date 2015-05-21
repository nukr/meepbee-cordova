let orderStatusLocaleTable = {
  'zh_TW': {
    'ORDER_STATUS_UNREAD': '尚未處理',
    'ORDER_STATUS_READ': '賣家已讀',
    'ORDER_STATUS_PROCESS': '處理中',
    'ORDER_STATUS_MET': '已面交',
    'ORDER_STATUS_SENT': '已寄送',
    'ORDER_STATUS_CANCEL': '訂單取消'
  }
};

export default (locale, key) => {
  return orderStatusLocaleTable[locale][key] || key;
}
