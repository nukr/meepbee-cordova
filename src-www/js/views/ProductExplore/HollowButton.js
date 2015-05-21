import React from 'react';
import styles from './styles';

class HollowButton extends React.Component {
  render () {
    return (
      <div
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onTouchTap={this.props.onTouchTap}
        style={
          Object.assign({},
            styles.socialBtn,
            this.props.style
          )
        }
      >
        {this.props.children}
      </div>
    );
  }
}

export default HollowButton;


