import React from 'react';

class NodeContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  _previousLeft = 0;
  _previousTop = 0;
  isDraging = false;
  // Use mouse move since pointer still requires polyfill
  handleMouseDown = e => {
    console.log(e);
    this.isDraging = true;
    this.calculatePositionDifference(e);
  };
  handleMouseUp = e => {
    console.log(e);
    this.isDraging = false;
  };
  handleMouseMove = e => {
    if (!this.isDraging) return;
    const { left, top } = this.calculatePositionDifference(e);
    const { x, y, handlePosChange } = this.props;
    handlePosChange({
      x: x + left,
      y: y + top
    });
  };

  calculatePositionDifference = e => {
    const { pageX: left, pageY: top } = e;
    const difference = {
      left: left - this._previousLeft,
      top: top - this._previousTop
    };
    this._previousLeft = left;
    this._previousTop = top;
    return difference;
  };
  render() {
    const { x, y, children } = this.props;
    return (
      <g
        transform={`translate(${x},${y})`}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        {children}
      </g>
    );
  }
}

export default NodeContainer;
