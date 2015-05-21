import React, {Component} from 'react';
import {FlexLayout, Header, Footer, Content} from './Layout';
import Spinner from './Components/Spinner';
import ProductStore from '../stores/ProductStore';
import action from '../actions/AppActionCreator';

class ImageCrop extends Component {
  constructor (props, context) {
    super();
    this.state = {
      ProductStore: ProductStore.getState(),
      dimensions: {
        imgTop: 0
      }
    };
    this.handleScroll = (e) => {
      let imgTop = e.target.scrollTop;
      let imgBottom = imgTop + e.target.clientHeight;
      this.setState({
        dimensions: {
          imgTop: imgTop,
          imgBottom: imgBottom
        }
      });
      console.log(imgTop);
    };
    this.handleClick = (e) => {
      let image = this.refs.img.getDOMNode();
      let canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalWidth;
      let radio = image.naturalWidth / image.width;
      let canvasContext = canvas.getContext('2d');
      canvasContext.drawImage(
        image,
        0, this.state.dimensions.imgTop * radio, image.naturalWidth, image.naturalWidth,
        0, 0, image.naturalWidth, image.naturalWidth
      );
      action.cropImage(canvas.toDataURL());
      context.router.goBack();
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    return (
      <FlexLayout>
        <Header title="圖片編輯"/>
        <Content style={{display: 'flex', flexFlow: 'column'}}>
          <div style={{height: '48px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></div>
          <div style={{overflowY: 'scroll', height: '100vw'}} onScroll={this.handleScroll}>
            <img ref="img" style={{maxWidth: '100%'}} src={this.state.ProductStore.savedImage ? this.state.ProductStore.savedImage : require('../../assets/elements/login_bg.png')} />
          </div>
          <div style={{height: '48px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></div>
          <div style={{flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', fontSize: '26px'}}>
            <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onTouchTap={this.handleClick}>
              <i className="fa fa-check"></i>
            </div>
            <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onTouchTap={this.handleClick}>
              <i className="fa fa-close"></i>
            </div>
          </div>
          <Spinner display={false} message="儲存中"/>
        </Content>
        <Footer />
      </FlexLayout>
    );
  }
}

export default ImageCrop;
