import React, {Component} from 'react';
import UserStore from '../../stores/UserStore';
import ProductStore from '../../stores/ProductStore';
import {FlexLayout, Header, Footer, Content} from '../Layout';
import {Panel, PanelInput, PanelLink} from '../Panels';
import styles from './styles';
import action from '../../actions/AppActionCreator';
import Spinner from '../Components/Spinner';
let m = Object.assign;

let getState = () => {
  let user = UserStore.getState();
  let product = ProductStore.getState();
  return {
    UserStore: user,
    ProductStore: product
  };
};

let alert2 = (msg) => {
  if (navigator.notification) {
    navigator.notification.alert(msg);
  } else {
    alert(msg);
  }
};

let isEmpty = (data) => {
  if (data instanceof Array) {
    return data.length === 0;
  } else {
    return (!data || !data.trim());
  }
};
let lastProductLaunching;

let validate = (product) => {
  if (isEmpty(product.imgArr)) return {error: true, message: '至少要有一張照片'};
  if (isEmpty(product.formData.title)) return {error: true, message: '商品名稱不得為空'};
  if (isEmpty(product.formData.location)) return {error: true, message: '地點不得為空'};
  if (isEmpty(product.formData.story)) return {error: true, message: '商品描述不得為空'};
  if (isEmpty(product.formData.price)) return {error: true, message: '金額不得為空'};
  if (isEmpty(product.formData.quantity)) return {error: true, message: '數量不得為空'};
  if (isEmpty(product.payments)) return {error: true, message: '至少選擇一種付款方式'};
  if (isEmpty(product.shippings)) return {error: true, message: '至少選擇一種運送方式'};
  return {error: false};
};

class Sell extends Component {
  constructor (props, context) {
    super();

    this.state = getState();
    this.change = () => this.setState(getState());

    this.handleChange = (e) => {
      this.state.UserStore.sellForm[e.target.name] = e.target.value;
    };


    this.productLaunch = () => {
      let product = {
        imgArr: this.state.ProductStore.cropImage,
        video: this.state.ProductStore.videoFilePath,
        formData: this.state.UserStore.sellForm,
        payments: this.state.UserStore.currentUser.get('payments').filter((payment) => payment.selected),
        shippings: this.state.UserStore.currentUser.get('shippings').filter((shipping) => shipping.selected)
      };
      let validation = validate(product);
      if (validation.error) {
        alert2(validation.message);
      } else {
        action.productLaunch(product);
      }
    };

    this.captureVideo = () => {
      navigator.device.capture.captureVideo((mediaFiles) => {
        let videoFilePath = mediaFiles[0].fullPath;
        navigator.videoThumbnail.createThumbnail(videoFilePath, (image64) => {
          action.saveVideo(videoFilePath, image64, mediaFiles);
        }, (e) => {
          navigator.notification.alert(e, null, 'error');
        });
      }, () => {
      }, {limit: 1, duration: 15});
    };

    this.createFixtureImage = () => {
      let img = new Image();
      img.src = require('../../../assets/elements/login_bg.png');
      img.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        let canvasContext = canvas.getContext('2d');
        canvasContext.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.naturalWidth, img.naturalHeight);
        return canvas.toDataURL();
      };
    };

    this.confirm = (index, e) => {
      let cameraSuccess = (imageData) => {
        action.saveImage('data:image/png;base64,' + imageData, index);
        context.router.transitionTo('/image-crop');
      };
      let cameraError = () => {
      };
      let cameraOptions = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.PNG,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 960,
        targetHeight: 960
      };
      let processConfirm = (index) => {
        switch (index) {
          case 1:
            navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
            break;

          case 2:
            cameraOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            cameraOptions.mediaType = Camera.MediaType.PICTURE;
            navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
            break;
          default:
        }
      };
      navigator.notification.confirm('拍照或是從圖庫中選擇', processConfirm, '圖片選擇', ['拍照', '圖庫']);
    };
  }

  static willTransitionTo (transition) {
    let user = UserStore.getState().currentUser;
    if (!(user && user.authenticated())) transition.redirect('/login');
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  componentDidUpdate (prevProps, prevState) {
    if (lastProductLaunching === true && this.state.ProductStore.productLaunching === false) {
      this.context.router.transitionTo('/products');
    }
    lastProductLaunching = this.state.ProductStore.productLaunching;
  }

  componentDidMount () {
    UserStore.addChangeListener(this.change);
    ProductStore.addChangeListener(this.change);
  }
  componentWillUnmount () {
    action.saveSellForm(this.state.UserStore.sellForm);
    UserStore.removeChangeListener(this.change);
    ProductStore.removeChangeListener(this.change);
  }

  renderImage () {
    let imgArr = [];
    for (var i = 0; i < 4; ++i) {
      imgArr.push(
        <ImageThumbnail
          key={'image-thumbnail' + i}
          src={this.state.ProductStore.cropImage[i]}
          onTouchTap={this.confirm.bind(null, i)}/>
      );
    }
    return imgArr;
  }
  render () {
    let sellForm = this.state.UserStore.sellForm;
    let paymentsArr = [];
    let shippingsArr = [];
    if (this.state.UserStore.currentUser) {
      let payments = this.state.UserStore.currentUser.get('payments');
      let shippings = this.state.UserStore.currentUser.get('shippings');
      payments.forEach((payment) => {
        if (payment.selected) {
          paymentsArr.push(payment.tradingWay);
        }
      });
      shippings.forEach((shipping) => {
        if (shipping.selected) {
          shippingsArr.push(shipping.shippingWay);
        }
      });
    }
    return (
      <FlexLayout>
        <Header title="販售商品" back={true} action={this.productLaunch} actionName="上架"/>
        <Content>
          <Panel>
            <div style={{padding: '5px'}}>上傳圖片或影片</div>
            <div style={{padding: '5px', color: 'lightgray', fontSize: '0.8em'}}>僅可上傳一個影片（15秒）</div>
            <div style={{display: 'flex', width: '100%', paddingTop: '5px', paddingBottom: '5px'}}>
              <ImageThumbnail video src={this.state.ProductStore.videoThumbnail} onTouchTap={this.captureVideo}/>
              {this.renderImage()}
            </div>
          </Panel>

          <Panel>
            <PanelInput defaultValue={sellForm.title} onChange={this.handleChange} name="title" placeholder="商品名稱" />
            <PanelInput defaultValue={sellForm.location} onChange={this.handleChange} name="location" placeholder="地點" />
            <PanelInput defaultValue={sellForm.story} onChange={this.handleChange} name="story" placeholder="產品資訊" />
          </Panel>

          <Panel>
            <PanelInput type="number" defaultValue={sellForm.price} onChange={this.handleChange} name="price" title="商品價格" />
            <PanelInput type="number" defaultValue={sellForm.quantity} onChange={this.handleChange} name="quantity" title="數量" />
          </Panel>

          <Panel>
            <PanelLink annotation={paymentsArr.join(', ')} to="/sell/payments">付款方式</PanelLink>
          </Panel>

          <Panel>
            <PanelLink annotation={shippingsArr.join(', ')} to="/sell/shippings">運送方式</PanelLink>
          </Panel>

          <Spinner display={this.state.ProductStore.productLaunching} message="上架中"/>
        </Content>
        <Footer active="sell" />
      </FlexLayout>
    );
  }
}

class ImageThumbnail extends Component {
  render () {
    return (
      <div
        onTouchTap={this.props.onTouchTap}
        style={
          m({},
            styles.editSellingBtn,
            styles.photoBackground,
            this.props.video && styles.videoBackground)
        }>
        <img style={{maxWidth: '100%'}} src={this.props.src}/>
      </div>
    );
  }
}

export default Sell;
