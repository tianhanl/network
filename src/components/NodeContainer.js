import React from 'react';
import { observer } from 'mobx-react';

@observer
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
    e.target.setPointerCapture(e.pointerId);
    this.calculatePositionDifference(e);
    e.stopPropagation();
  };
  handlePointerUp = e => {
    this.isDraging = false;
    e.stopPropagation();
  };

  handlePointerMove = e => {
    if (!this.isDraging) return;
    const { left, top } = this.calculatePositionDifference(e);
    const { node, handlePosChange } = this.props;
    handlePosChange({
      x: node.x + left,
      y: node.y + top
    });
    e.stopPropagation();
  };

  render() {
    const { node, children } = this.props;
    return (
      <g
        style={{
          cursor: 'pointer'
        }}
        id={`node-${node.id}`}
        transform={`translate(${node.x},${node.y})`}
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
