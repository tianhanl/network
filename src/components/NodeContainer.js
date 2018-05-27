import React from 'react';

class NodeContainer extends React.Component {
  constructor(props) {
    super(props);
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
    this._previousLeft = left;
    this._previousTop = top;
    return difference;
  };
  // Use mouse move since pointer still requires polyfill
  handleMouseDown = e => {
    this.isDraging = true;
    this.calculatePositionDifference(e);
    e.stopPropagation();
  };
  handleMouseUp = e => {
    this.isDraging = false;
    e.stopPropagation();
  };
  handleMouseMove = e => {
    if (!this.isDraging) return;
    const { left, top } = this.calculatePositionDifference(e);
    const { x, y, handlePosChange } = this.props;
    handlePosChange({
      x: x + left,
      y: y + top
    });
    e.stopPropagation();
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
