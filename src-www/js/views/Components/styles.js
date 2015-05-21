let globalStyles = require('../styles');

module.exports = {
  navTabs: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${globalStyles.meepbeeColor}`,
    margin: '30px 10px 30px 10px',
    borderRadius: '5px'
  },
  navLink: {
    flex: '1',
    display: 'flex',
    height: '30px',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: globalStyles.meepbeeColor
  },
  navHigtlight: {
    background: globalStyles.meepbeeColor,
    color: 'white'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'flex'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    border: '5px solid #fff',
    borderTop: '5px solid rgba(0,0,0,0)',
    borderLeft: '5px solid rgba(0,0,0,0)',
    width: '30px',
    height: '30px',
    cursor: 'wait',
    backgroundColor: 'rgba(0,0,0,0)',
    opacity: 0.8,
    borderRadius: '50px',
    WebkitAnimation: 'spin 1s linear infinite'
  },
  spinnerBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100px',
    height: '100px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column'
  }
};

