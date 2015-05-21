let globalStyles = require('../styles');

module.exports = {
  orderListItemContainer: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center'
  },
  orderStatus: {
    flex: 1,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around'
  },
  orderPrice: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '64px'
  },
  user: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    alignItems: 'center',
    background: globalStyles.meepbeeColor
  },
  avatar: {
    display: 'flex',
    marginTop: '30px',
    width: '100px',
    height: '100px'
  },
  editBtn: {
    color: 'white',
    marginTop: '30px',
    padding: '6px 15px',
    display: 'flex',
    borderRadius: '3px',
    border: '2px solid white'
  },
  followed: {
    color: globalStyles.meepbeeColor,
    backgroundColor: 'white'
  },
  fansAndFollowers: {
    color: 'white',
    width: '100%',
    display: 'flex',
    paddingBottom: '20px'
  },
  hide: {
    display: 'none'
  },
  error: {
    color: 'red'
  },
  flexAllCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

