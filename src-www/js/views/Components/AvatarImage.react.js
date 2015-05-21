import React, {Component} from 'react';
let m = Object.assign;

class AvatarImage extends Component {
  static get propTypes () {
    return {
      width: React.PropTypes.string,
      height: React.PropTypes.string,
      url: React.PropTypes.string
    };
  }
  render () {
    let {width, height, url} = this.props
    if (!url) {
      url = require('../../../assets/elements/img_avatar_nophoto.png');
    }
    return (
      <div>
        <img style={
          m(
            {},
            {width: width},
            url && {borderRadius: width.replace(/px/, '') / 2}
          )}
          src={url}/>
      </div>
    );
  }
}

export default AvatarImage;
