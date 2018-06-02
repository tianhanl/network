import React from 'react';
import { observer } from 'mobx-react';

const Edge = observer(props => {
  const { fromNode, toNode } = props;
  return (
    <line
      x1={fromNode.x}
      y1={fromNode.y}
      x2={toNode.x}
      y2={toNode.y}
      stroke="#9F9F9F"
    />
  );
});

export default Edge;
