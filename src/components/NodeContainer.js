import React from 'react';
import { observer } from 'mobx-react';
import draggable from '../utils/draggable';
import DefaultNode from './DefaultNode';

@observer
class NodeContainer extends React.Component {
  render() {
    const {
      node,
      children,
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
      isDragging
    } = this.props;
    console.log(children);
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
        {children || <DefaultNode />}
      </g>
    );
  }
}

export default draggable(NodeContainer);
