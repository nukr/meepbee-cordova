import React from 'react';
import styles from './styles';

class PanelRadio extends React.Component {
  render () {
    return (
      <div onTouchTap={this.props.onTouchTap.bind(null, this.props.index)} style={
        Object.assign(
          {},
          styles.radio,
          this.props.selected && styles.selected
        )
      }>
        <div>{this.props.children}</div>
        {
          this.props.display
          ?
            <div>${this.props.value.fee}</div>
          :
            <div>{this.props.selected ? '√' : ''}</div>
        }
      </div>
    );
  }
}

export default PanelRadio;
