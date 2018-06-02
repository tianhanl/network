import React from 'react';
import { observer } from 'mobx-react';
import draggable from '../utils/draggable';

@observer
class NodeContainer extends React.Component {
  render() {
    const {
      node,
      children,
      handlePointerDown,
      handlePointerMove,
      handlePointerUp
    } = this.props;
    return (
      <g
        style={{
          cursor: 'pointer'
        }}
        id={`node-${node.id}`}
        transform={`translate(${node.x},${node.y})`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        {children}
      </g>
    );
  }
}

export default draggable(NodeContainer);
