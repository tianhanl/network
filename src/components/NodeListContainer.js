import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
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
  static propTypes = {};

  componentDidMount() {
    this.props.nodesStore.restoreNodes(sampleNodes);
  }

  handlePosChange = id => pos => {
    this.props.nodesStore.changeNodePos(id, pos);
    this.props.canvasStore.handleNodePosChange(pos);
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
            >
              <rect width="100" height="100" />
            </NodeContainer>
          );
        })}
      </React.Fragment>
    );
  }
}

export default NodeListContainer;
