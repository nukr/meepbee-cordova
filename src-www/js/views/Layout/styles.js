let stylesGlobal = require('../styles');

module.exports = {
  main: {
    WebkitAnimation: 'fadeIn 900ms',
    display: 'flex',
    flexFlow: 'column',
    height: '100%'
  },
  footer: {
    display: 'flex',
    background: 'white',
    height: '48px',
    borderTop: '1px solid #E0E0E0'
  },
  footerIconWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerBtn: {
    display: 'flex',
    flexFlow: 'column',
    flex: 1,
    textDecoration: 'none',
    color: 'lightgray',
    fontSize: '12px'
  },
  footerBtnInner: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: '2px'
  },
  img: {
    width: '48px',
    marginTop: '10px'
  },
  footerBtnWord: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '-5px'
  },
  flexLayout: {
    WebkitAnimation: 'fadeIn 900ms',
    display: 'flex',
    flexFlow: 'column',
    height: '100%'
  },
  active: {
    backgroundColor: stylesGlobal.meepbeeColor,
    color: 'white'
  },
  content: {
    flex: 1,
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  confirmCheckout: {
    background: stylesGlobal.meepbeeColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    height: '48px',
    borderTop: '1px solid #E0E0E0'
  },

  productInfoFooter: {
    background: stylesGlobal.meepbeeColor,
    display: 'flex',
    color: 'white',
    height: '48px',
    borderTop: '1px solid #E0E0E0'
  },

  messageHeader: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    color: 'white',
    background: stylesGlobal.meepbeeColor,
    justifyContent: 'center',
    fontFamily: 'Helvetica, LiHeiPro'
  },

  personalHeaderData: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    color: 'white',
    background: stylesGlobal.meepbeeColor,
    justifyContent: 'space-between',
    fontFamily: 'Helvetica, LiHeiPro'
  },

  header: {
    display: 'flex',
    height: '48px',
    justifyContent: 'center',
    alignItems: 'center',
    background: stylesGlobal.meepbeeColor,
    color: 'white',
    fontFamily: 'Helvetica, LiHeiPro'
  },

  spaceBetween: {
    justifyContent: 'space-between'
  },

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  backgroundSettings: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 0%',
    backgroundSize: '48px'
  },

  headerAction: {
    width: '60px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  meepbeeColor: stylesGlobal.meepbeeColor,
  logoSmall: `url(${require('../../../assets/elements/logo_small.png')})`,

  storeOff: {
    backgroundImage: `url(${require('../../../assets/elements/tab_icon_store_off.png')})`
  },
  storeOn: {
    backgroundImage: `url(${require('../../../assets/elements/tab_icon_store_on_2x.png')})`
  },

  messageOff: {
    backgroundImage: `url(${require('../../../assets/elements/tab_icon_message_off.png')})`
  },
  messageOn: {
    backgroundImage: `url(${require('../../../assets/elements/tab_icon_message_white.png')})`
  },

  profileOff: {
    backgroundImage: `url(${require('../../../assets/elements/tab_icon_profile_off.png')})`
  },
  profileOn: {
    backgroundImage: `url(${require('../../../assets/elements/tab_icon_profile_on_2x.png')})`
  },

  photoOn: {
    backgroundImage: `url(${require('../../../assets/elements/tab_icon_photo.png')})`
  },
  photoOff: {
    backgroundImage: `url(${require('../../../assets/elements/tab_icon_photo_green.png')})`
  },

  navbarIconBack: {
    backgroundImage: `url(${require('../../../assets/elements/navbar_icon_back.png')})`
  }
};
