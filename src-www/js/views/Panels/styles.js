import globalStyles from '../styles';

export default {
  flex: {
    display: 'flex'
  },
  panel: {
    background: 'white',
    width: '100%',
    marginTop: '20px',
    display: 'flex',
    flexFlow: 'column'
  },

  panelInputContainer: {
    padding: '5px 20px 5px 20px',
    borderBottom: '1px solid #E0E0E0'
  },

  panelInput: {
    border: '0',
    padding: '0',
    width: '100%',
    height: '40px'
  },

  inputTitle: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  link: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '56px',
    textDecoration: 'none',
    border: '1px solid #E0E0E0',
    color: '#262626'
  },

  linkRightElementInner: {
    width: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },

  radio: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    border: '1px solid #E0E0E0'
  },

  checkbox: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    border: '1px solid #E0E0E0'
  },

  label: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 20px 16px 0px',
    marginLeft: '20px',
    fontSize: '15px',
    borderBottom: '1px solid #E0E0E0'
  },

  incrementButton: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    border: '1px solid #E0E0E0'
  },

  buttonLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5em',
    width: '45px',
    height: '30px',
    borderRadius: '5px 0 0 5px',
    borderTop: '1px solid #E0E0E0',
    borderLeft: '1px solid #E0E0E0',
    borderRight: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0'
  },

  buttonRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5em',
    width: '45px',
    height: '30px',
    borderRadius: '0 5px 5px 0',
    borderTop: '1px solid #E0E0E0',
    borderRight: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0'
  },

  title: {
    padding: '10px'
  },

  quantity: {
    marginRight: '10px'
  },

  selected: {
    background: 'yellow'
  },

  checked: {
    background: 'yellow'
  }
};
