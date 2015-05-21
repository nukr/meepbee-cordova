import React from 'react';
import styles from './styles';

class Header extends React.Component {
  constructor (props, context) {
    super();
    this.handleBack = () => {
      if (!context.router.goBack()) {
        context.router.transitionTo('/');
      }
    };
  }
  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  static get propTypes () {
    return {
      back: React.PropTypes.bool,
      title: React.PropTypes.string,
      action: React.PropTypes.func
    };
  }

  render () {
    let img = <img height="24px" src={require('../../../assets/elements/logo_small.png')} alt="logo" />;
    let back = (
      <div style={{width: '60px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onTouchTap={this.handleBack}>
        <i style={{fontSize: '26px'}} className="fa fa-arrow-left"></i>
      </div>
    );
    // dummy div placeholder
    let action = <div style={{marginRight: '20px', width: '40px', height: '40px'}}></div>;

    if (this.props.action) {
      action = (
        <div style={styles.headerAction} onTouchTap={this.props.action}>
          {this.props.actionName || <i style={{fontSize: '26px'}} className={`fa fa-${this.props.icon}`}></i>}
        </div>
      );
    }
    return (
      <header style={
        Object.assign(
          {},
          styles.header,
          this.props.back && styles.spaceBetween
        )
      }>
        {this.props.back && back}
        <div>
          {this.props.title === 'meepbee' ? img : this.props.title}
        </div>
        {this.props.back && action}
      </header>
    );
  }
}

export default Header;
