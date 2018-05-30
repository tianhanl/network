import React from 'react';

class NodeContainer extends React.Component {
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
  handlePointerDown = e => {
    this.isDraging = true;
    this.calculatePositionDifference(e);
    e.preventDefault();
    e.stopPropagation();
  };
  handlePointerUp = e => {
    this.isDraging = false;
    e.stopPropagation();
  };
  hanldePointerLeave = e => {
    this.isDraging = false;
    e.stopPropagation();
  };
  handlePointerMove = e => {
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
        onPointerDown={this.handlePointerDown}
        onPointerUp={this.handlePointerUp}
        onPointerMove={this.handlePointerMove}
        onPointerLeave={this.hanldePointerLeave}
      >
        {children}
      </g>
    );
  }
}

export default NodeContainer;
