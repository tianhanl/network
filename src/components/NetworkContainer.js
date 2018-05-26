import React from 'react';
import NodeContainer from './NodeContainer';
import { Map } from 'immutable';
import NetworkCanvas from './NetworkCanvas';
const sampleNodes = {
  1: {
    x: 400,
    y: 400
  },
  2: {
    x: 0,
    y: 0
  }
};

class NetworkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: Map(sampleNodes)
    };
  }

  handlePosChange = id => pos => {
    this.setState({
      ...this.state,
      nodes: this.state.nodes.set(id, pos)
    });
  };

  render() {
    return (
      <NetworkCanvas
        viewerWidth={400}
        viewerHeight={400}
        canvasWidth={500}
        canvasHeight={500}
      >
        {this.state.nodes.entrySeq().map(entry => {
          const [key, node] = entry;
          return (
            <NodeContainer
              key={key}
              x={node.x}
              y={node.y}
              handlePosChange={this.handlePosChange(key)}
            >
              <rect width="100" height="100" />
            </NodeContainer>
          );
        })}
      </NetworkCanvas>
    );
  }
}

export default NetworkContainer;
