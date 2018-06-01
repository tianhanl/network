import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Edge from './Edge';

const sampleEdges = [
  {
    id: 23412341,
    fromNodeId: 1,
    toNodeId: 2
  }
];

@inject('edgesStore', 'nodesStore')
@observer
export default class EdgesContainer extends Component {
  componentDidMount() {
    this.props.edgesStore.restoreEdges(sampleEdges);
  }

  render() {
    const { edgesStore, nodesStore } = this.props;
    return (
      <React.Fragment>
        {edgesStore.edges.map(edge => (
          <Edge
            key={edge.id}
            fromNode={nodesStore.getNode(edge.fromNodeId)}
            toNode={nodesStore.getNode(edge.toNodeId)}
          />
        ))}
      </React.Fragment>
    );
  }
}
