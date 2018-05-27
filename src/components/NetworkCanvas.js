import React from 'react';

// Automatically scroll viewport accroding to mousemove

class NetworkCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollLeft: 0,
      scrollTop: 0
    };
    this.viewer = React.createRef();
  }

  _previousLeft = 0;
  _previousTop = 0;
  isDraging = false;

  calculatePositionDifference = e => {
    const { pageX: left, pageY: top } = e;
    const difference = {
      left: left - this._previousLeft,
      top: top - this._previousTop
    };
    return difference;
  };

  handleMouseUp = e => {
    this.isDraging = false;
  };

  handleMouseMove = e => {
    if (!this.isDraging) return;
    const { scrollLeft, scrollTop } = this.state;
    const { left, top } = this.calculatePositionDifference(e);
    const viewerNode = this.viewer.current;
    viewerNode.scrollLeft = scrollLeft - left;
    viewerNode.scrollTop = scrollTop - top;
  };

  handleMouseDown = e => {
    const viewerNode = this.viewer.current;
    this.isDraging = true;
    const { pageX: left, pageY: top } = e;
    this._previousLeft = left;
    this._previousTop = top;
    this.setState({
      scrollLeft: viewerNode.scrollLeft,
      scrollTop: viewerNode.scrollTop
    });
  };

  render() {
    const {
      viewerWidth,
      viewerHeight,
      canvasWidth,
      canvasHeight,
      children
    } = this.props;
    return (
      <div
        id={'network-container'}
        style={{
          border: '2px red solid',
          overflow: 'scroll',
          width: viewerWidth,
          height: viewerHeight
        }}
        ref={this.viewer}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <svg width={canvasWidth} height={canvasHeight}>
          {children}
        </svg>
      </div>
    );
  }
}

export default NetworkCanvas;
