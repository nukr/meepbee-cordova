import React from 'react';
import PanelRadio from './PanelRadio';
import styles from './styles';

class PanelRadioGroup extends React.Component {
  constructor (props) {
    super();
    this.state = {
      select: 0
    };
    this.handleClick = this.handleClick.bind(this);
    if (props.data) {
      props.onChange(props.data[0].value, props.name);
    }
  }

  handleClick (index, event) {
    this.setState({
      select: index
    });
    this.props.onChange(this.props.data[index].value, this.props.name);
  }

  render () {
    return (
      <div>
        {
          this.props.data.map((d, index) => {
            return (
              <PanelRadio
                key={index}
                onTouchTap={this.handleClick}
                index={index}
                selected={this.state.select === index}
                display={this.props.display}
                value={d.value}
              >
                {d.title}
              </PanelRadio>
            );
          })
        }
      </div>
    );
  }
}

export default PanelRadioGroup;

