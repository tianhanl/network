import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, propTypes } from 'mobx-react';
import { values } from 'mobx';

import NodeContainer from './NodeContainer';
const sampleNodes = [
  {
    id: 1,
    x: 400,
    y: 400
  },
  {
    id: 2,
    x: 0,
    y: 0
  }
];

@inject('nodesStore', 'canvasStore')
@observer
class NodeListContainer extends Component {
  componentDidMount() {
    this.props.nodesStore.restoreNodes(sampleNodes);
  }

  handlePosChange = id => difference => {
    const { nodesStore, canvasStore } = this.props;
    const newPosition = {
      x: nodesStore.getNode(id).x + difference.left,
      y: nodesStore.getNode(id).y + difference.top
    };
    nodesStore.changeNodePos(id, newPosition);
    canvasStore.handleNodePosChange(newPosition);
  };

  render() {
    return (
      <React.Fragment>
        {values(this.props.nodesStore.nodes).map(node => {
          return (
            <NodeContainer
              node={node}
              key={node.id}
              handlePosChange={this.handlePosChange(node.id)}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

NodeListContainer.propTypes = {
  nodesStore: PropTypes.object,
  canvasStore: PropTypes.object
};

export default NodeListContainer;
