import React from 'react';
import { observer } from 'mobx-react';
import draggable from '../utils/draggable';

const NodeContainer = observer(props => {
  const {
    node,
    children,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  } = props;
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
});

export default draggable(NodeContainer);
