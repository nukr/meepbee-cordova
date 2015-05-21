import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './styles';
import UserStore from '../../stores/UserStore';
let m = Object.assign;
import superlog from '../../util/log';
let log = superlog('PanelLink');

class PanelLink extends Component {
  constructor (props, context) {
    super();
    this.handleClick = (e) => {
      if (props.to) context.router.transitionTo(props.to);
      if (props.onTouchTap) props.onTouchTap(e);
    };
  }

  static get propTypes () {
    return {
      className: React.PropTypes.string,
      component: React.PropTypes.any,
      to: React.PropTypes.string,
      deleteFn: React.PropTypes.func
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    let {editable, deleteFn} = this.props;
    return (
      <div onTouchTap={this.handleClick} style={styles.link}>
        <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
          {this.props.children}
          {this.props.annotation &&
            <small style={{display: 'block', color: 'lightgray'}}>
              {this.props.annotation}
            </small>}
        </div>
        <Chevron deleteFn={deleteFn} editable={editable} description={this.props.description}/>
      </div>
    );
  }
}

class Chevron extends Component {
  render () {
    let {editable, deleteFn} = this.props;
    return (
      <div style={m(
        {},
        {color: 'lightgray', display: 'flex'},
        editable && {background: 'red', WebkitAnimation: 'viewShowFromRightEnter 0.2s ease'})}>
        {editable ? <Deletion deleteFn={deleteFn}/> : <Chev/>}

      </div>
    );
  }
}

class Deletion extends Component {
  render () {
    return (
      <div onTouchTap={this.props.deleteFn} style={
        m(
          {},
          styles.linkRightElementInner,
          {color: 'white'}
          )}>
        刪除
      </div>
    );
  }
}

class Chev extends Component {
  render () {
    return (
      <div style={styles.linkRightElementInner}>
        <div>
          {this.props.description}
        </div>
        <i style={m(
          {},
          {marginLeft: '7px', marginRight: '20px'}
        )} className='fa fa-chevron-right'></i>
      </div>
    )
  }
}


export default PanelLink;

