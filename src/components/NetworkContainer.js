import React from 'react';
import NodeContainer from './NodeContainer';

const sampleNodes = {
  1234234: {
    x: 0,
    y: 0
  }
};

class NetworkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: sampleNodes
    };
  }

  handlePosChange = id => pos => {
    this.setState({
      nodes: {
        ...this.state.nodes,
        [id]: {
          x: pos.x,
          y: pos.y
        }
      }
    });
  };

  render() {
    return (
      <svg width={500} height={500}>
        {Object.keys(this.state.nodes).map(key => {
          const node = this.state.nodes[key];
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
      </svg>
    );
  }
}

export default NetworkContainer;
