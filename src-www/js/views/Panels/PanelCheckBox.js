import React, {Component} from 'react';
import styles from './styles';

class PanelCheckBox extends Component {
  static get propTypes () {
    return {
      name: React.PropTypes.string,
      label: React.PropTypes.string,
      value: React.PropTypes.any,
      checked: React.PropTypes.bool
    }
  }

  render () {
    return (
      <div
        onTouchTap={this.props.onTouchTap}
        style={
          Object.assign(
            {},
            styles.checkbox,
            this.props.checked && styles.checked
          )
      }>
        <div>{this.props.value}</div>
        <div>{this.props.checked ? '√' : ' '}</div>
      </div>
    );
  }
}

export default PanelCheckBox;

