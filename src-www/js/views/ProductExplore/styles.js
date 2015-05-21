let globalStyles = require('../styles');
module.exports = {
  productImage: {
    width: '100%',
    height: '100%'
  },
  avatar: {
    position: 'absolute',
    top: '5%',
    left: 0,
    width: '100%'
  },
  avatarImage: {
    width: '10%',
    borderRadius: '50%'
  },
  sellerName: {
    color: 'white',
    marginLeft: '5%',
    position: 'absolute',
    textShadow: '1px 0px lightgray',
    top: '25%'
  },
  productPriceTag: {
    position: 'absolute',
    top: '80%',
    background: '#424242',
    left: 0,
    color: '#FFF',
    padding: '5px'
  },
  productImageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  title: {
    fontSize: '1.1em',
    color: '#1E1E1E'
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexFlow: 'row',
    lineHeight: '2em',
    paddingTop: '6px',
    fontSize: '0.7em',
    color: '#D3D3D3',
    paddingBottom: '6px'
  },
  info: {
    background: 'white',
    display: 'flex',
    flexFlow: 'column',
    marginBottom: '20px',
    padding: '10px'
  },
  btnWrapper: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between'
  },
  socialBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: globalStyles.meepbeeColor,
    width: '60px',
    height: '30px',
    marginRight: '8px',
    borderRadius: '3px',
    border: `1px solid ${globalStyles.borderColor}`
  },
  purchaseBtn: {
    lineHeight: '36px',
    color: 'white',
    background: globalStyles.meepbeeColor,
    borderRadius: '3px',
    padding: '0px 25px 0px 25px',
    alignSelf: 'flex-end'
  },
  flexRow: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  hide: {
    visibility: 'hidden'
  },
  fadeIn: {
    WebkitAnimation: 'fadeIn 1s'
  },
  small: {
    color: '#D3D3D3'
  },
  likeGrayIcon: {
    background: `url(${require('../../../assets/elements/btn_icon_like_white.png')}) no-repeat center`
  },
  commentIcon: {
    background: `url(${require('../../../assets/elements/btn_icon_message_white.png')}) no-repeat center`
  },
  likeRedIcon: {
    background: `url(${require('../../../assets/elements/btn_icon_like_red.png')}) no-repeat center`
  }
};
