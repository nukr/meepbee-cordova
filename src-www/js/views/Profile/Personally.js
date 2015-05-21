import React from 'react';
import {Panel, PanelInput, PanelLink, PanelHeader, PanelTextArea} from '../Panels/'
import FlexLayout from '../Layout';

class Personally extends React.Component {
  render () {
    return (
      <div style={{width: '100%'}}>
        <PanelHeader>交易方式</PanelHeader>
        <Panel>
          <PanelInput />
        </Panel>
        <PanelHeader>描述</PanelHeader>
        <Panel>
          <PanelTextArea />
        </Panel>
      </div>
    );
  }
}

export default Personally;

