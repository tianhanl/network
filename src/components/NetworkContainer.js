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

const sampleCanvas = {
  viewerWidth: 400,
  viewerHeight: 400,
  canvasWidth: 500,
  canvasHeight: 500,
  scrollLeft: 0,
  scrollTop: 0
};

class NetworkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: Map(sampleNodes),
      canvas: sampleCanvas
    };
  }

  handlePosChange = id => pos => {
    this.setState({
      ...this.state,
      nodes: this.state.nodes.set(id, pos)
    });
  };

  handleCanvasDrag = pos => {
    this.setState({
      ...this.state,
      canvas: {
        ...this.state.canvas,
        scrollLeft: this.state.canvas.scrollLeft - pos.left,
        scrollTop: this.state.canvas.scrollTop - pos.top
      }
    });
  };

  setScrollPosition = pos => {
    this.setState({
      ...this.state,
      canvas: {
        ...this.state.canvas,
        ...pos
      }
    });
  };

  render() {
    const { nodes, canvas } = this.state;
    return (
      <NetworkCanvas
        viewerWidth={canvas.viewerWidth}
        viewerHeight={canvas.viewerHeight}
        canvasWidth={canvas.canvasWidth}
        canvasHeight={canvas.canvasHeight}
        scrollLeft={canvas.scrollLeft}
        scrollTop={canvas.scrollTop}
        handleCanvasDrag={this.handleCanvasDrag}
        setScrollPosition={this.setScrollPosition}
      >
        {nodes.entrySeq().map(entry => {
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
