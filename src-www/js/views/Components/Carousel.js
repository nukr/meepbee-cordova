import React from 'react';
import './Carousel.css';

export default class Carousel extends React.Component {
  constructor () {
    super();
    this.state = {
      x: 0,
      index: 0,
      width: 0,
      isScrolling: false,
      resistance: 1,
      touchEnd: false,
      startTime: 0
    };
  }
  componentDidMount () {
    let el = React.findDOMNode(this.refs.carousel);
    this.setState({
      width: el.offsetWidth
    });
    this.handleTouchStart = (e) => {
      this.state.pageX = e.touches[0].pageX;
      this.state.pageY = e.touches[0].pageY;
      this.state.deltaX = 0;
      this.state.deltaY = 0;
      this.state.touchEnd = false;
      this.state.startTime = +new Date();
    };
    this.handleTouchMove = (e) => {
      this.state.deltaX = e.touches[0].pageX - this.state.pageX;
      this.state.deltaY = e.touches[0].pageY - this.state.pageY;
      this.state.pageX = e.touches[0].pageX;
      this.state.pageY = e.touches[0].pageY;
      this.state.isScrolling = Math.abs(this.state.deltaY) > Math.abs(this.state.deltaX);
      if (this.state.isScrolling) {
        return;
      }
      e.preventDefault();
      let newX = this.state.x + this.state.deltaX / this.state.resistance;
      this.setState({
        x: newX
      });
    };
    this.handleTouchEnd = (e) => {
      let time = +new Date() - this.state.startTime;
      let round = time < 666 ? (this.state.deltaX < 0 ? 'floor' : 'ceil') : 'round';
      let slideIndex = Math[round](this.state.x / this.state.width);
      slideIndex = Math.min(slideIndex, 0);
      slideIndex = Math.max(-(this.props.images.length-1), slideIndex);
      let newX = slideIndex * this.state.width;
      this.setState({
        index: Math.abs(slideIndex),
        touchEnd: true,
        x: newX
      });
    };
  }
  render () {
    let count = this.props.images.length;
    let ulStyle = {
      padding: 0,
      marginTop: '0',
      width: (this.state.width * count)+'px',
      WebkitTransform: 'translate3d('+this.state.x+'px, 0px, 0px)',
      transform: 'translate3d('+this.state.x+'px, 0px, 0px)'
    };
    let olStyle = {
      width: this.state.width+'px',
      padding: 0
    };
    if (this.state.touchEnd) {
      ulStyle.WebkitTransitionDuration = '.2s';
    }
    return (
      <div ref='carousel' className='carousel carousel-slider' onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
        <div className='slider-wrapper'>
          <ul style={ulStyle}>
            {this.props.images.map((item, i) => {
              let properties = {
                key: `carousel-${i}`,
                x: this.state.x,
                index: i,
                item: item,
                width: this.state.width
              };
              return <CarouselSlide {...properties}/>;
            })}
          </ul>
          { this.props.point &&
            <ol style={olStyle}>
              {this.props.images.map((item, i) => <CarouselPoint key={'point-' + i} selected={i===this.state.index} />)}
            </ol>
          }
        </div>
      </div>
    );
  }
}
Carousel.defaultProps = {
  images: [],
  point: true
};
class CarouselSlide extends React.Component {
  constructor () {
    super();
    this.state = {
      loader: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
      showImage: false
    };
  }
  componentDidUpdate (prevProps) {
    let preIndex = this.props.index-1;
    if (!this.state.showImage && this.props.width && (Math.abs(this.props.x) > this.props.width * preIndex)) {
      this.setState({
        showImage: true
      });
    }
  }
  componentWillMount () {
    if (!this.props.index) {
      this.state.showImage = true;
    }
  }
  render () {
    let item = this.props.item;
    let src = this.state.showImage ? item.src : this.state.loader;
    let liStyle = {};
    if (this.props.width) {
      liStyle.width = this.props.width + 'px';
    }
    return (
      <li className='slide' style={liStyle}>
        <img src={src} />
      </li>
    );
  }
}
class CarouselPoint extends React.Component {
  constructor () {
    super();
  }
  render () {
    let className = ['point'];
    if (this.props.selected) {
      className.push('selected');
    }
    return (
      <li className={className.join(' ')}></li>
    );
  }
}

