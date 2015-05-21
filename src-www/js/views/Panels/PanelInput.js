import React from 'react';
import styles from './styles';
let m = Object.assign;

class PanelInput extends React.Component {

  static get propTypes () {
    return {
      title: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      type: React.PropTypes.string,
      defaultValue: React.PropTypes.any,
      disabled: React.PropTypes.bool
    };
  }

  static get defaultProps () {
    return {
      type: 'text'
    };
  }

  render () {
    return (
      <div style={m(
        styles.panelInputContainer,
        this.props.title && styles.flex
      )}>
        {this.props.title && <div style={styles.inputTitle}>{this.props.title}</div>}
        <input
          onChange={this.props.onChange}
          name={this.props.name}
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          style={m(
            styles.panelInput,
            this.props.title && {flex: 3}
          )} type={this.props.type} />
      </div>
    );
  }
}

export default PanelInput;

