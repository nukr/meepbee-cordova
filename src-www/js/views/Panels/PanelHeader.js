import React from 'react';

class PanelHeader extends React.Component {
  displayName: 'PanelHeader'

  render () {
    return (
      <div style={{
        marginBottom: '-20px',
        marginTop: '20px',
        padding: '10px',
        color: '#777'
      }}>{this.props.children}</div>
    );
  }
}

export default PanelHeader;



