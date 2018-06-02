import React from 'react';
import { observer, PropTypes } from 'mobx-react';

// Since observer will convert functional component into class ocmponent to use
// life cycle functions, this component will be a class component
// https://github.com/mobxjs/mobx/issues/1094
@observer
class Edge extends React.Component {
  render() {
    const { fromNode, toNode } = this.props;
    return (
      <line
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        strokeWidth={2}
        stroke="#9F9F9F"
      />
    );
  }
}

Edge.propTypes = {
  fromNode: PropTypes.observableObject,
  toNode: PropTypes.observableObject
};

export default Edge;
