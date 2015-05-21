import React, {Component} from 'react';
import { FlexLayout, Content, Header, Footer } from '../Layout';
import {Panel, PanelLabel, PanelHeader} from '../Panels';
import UserStore from '../../stores/UserStore';

class OrderStatus extends Component {
  constructor (props, context) {
    super();
    let orderId = context.router.getCurrentParams().orderId;
    this.state = {
      order: UserStore.getOrderById(orderId)
    };
  }

  static get contextTypes () {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  render () {
    let buyer = this.state.order.get('buyer').toJSON();
    let order = this.state.order.toJSON();
    console.log(order);
    return (
      <FlexLayout>
        <Header title="訂單" back/>
        <Content>
          <div style={{display: 'flex', padding: '10px 20px'}}>
            <img src={order.orderForm.productImageURL} width="64px" height="64px"/>
            <div style={{flex: 1, display: 'flex', alignItems: 'center', paddingLeft: '5px'}}>{order.orderForm.title}</div>
          </div>
          <Panel>
            <PanelLabel left="聯絡賣家"/>
            <PanelLabel left="訂單狀態"/>
          </Panel>

          <PanelHeader>付款方式</PanelHeader>
          <Panel>
            <PanelLabel left="面交"></PanelLabel>
          </Panel>

          <PanelHeader>運送方式</PanelHeader>
          <Panel>
            <PanelLabel left="面交"></PanelLabel>
          </Panel>

          <PanelHeader>訂單資訊</PanelHeader>
          <Panel>
            <PanelLabel left={buyer.name}/>
            <PanelLabel left={order.orderForm.phoneNumber}/>
            <PanelLabel left={order.orderForm.payment.description}/>
          </Panel>

          <PanelHeader>價格</PanelHeader>
          <Panel>
            <PanelLabel left="商品價格" right={order.orderForm.pricePerProduct}/>
            <PanelLabel left="數量" right={order.orderForm.quantity}/>
            <PanelLabel left="運費" right={order.orderForm.shipping.fee}/>
            <PanelLabel left="訂單總金額" right={order.orderForm.pricePerProduct * order.orderForm.quantity + order.orderForm.shipping.fee}/>
          </Panel>
        </Content>
        <Footer/>
      </FlexLayout>
    );
  }
}

export default OrderStatus;
