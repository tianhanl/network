import React from 'react';
import { observer } from 'mobx-react';
import NodeContainer from './NodeContainer';
import NetworkCanvas from './NetworkCanvas';
import nodesStore from '../stores/nodesStore';
import { values } from 'mobx';
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

const sampleCanvas = {
  viewerWidth: 400,
  viewerHeight: 400,
  canvasWidth: 500,
  canvasHeight: 500,
  scrollLeft: 0,
  scrollTop: 0
};

@observer
class NetworkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: sampleCanvas
    };
    this.nodesStore = nodesStore;
  }

  componentDidMount() {
    this.nodesStore.initializeNodes(sampleNodes);
  }

  handlePosChange = id => pos => {
    this.nodesStore.changeNodePos(id, pos);
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
    const { canvas } = this.state;
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
        {values(this.nodesStore.nodes).map(node => {
          return (
            <NodeContainer
              key={node.id}
              x={node.x}
              y={node.y}
              handlePosChange={this.handlePosChange(node.id)}
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
