import React from 'react';
import { observer } from 'mobx-react';
import NodeContainer from './NodeContainer';
import NetworkCanvas from './NetworkCanvas';
import nodesStore from '../stores/nodesStore';
import canvasStore from '../stores/canvasStore';
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
    this.nodesStore = nodesStore;
    this.canvasStore = canvasStore;
  }

  componentDidMount() {
    this.nodesStore.initializeNodes(sampleNodes);
    this.canvasStore.restoreCanvas(sampleCanvas);
  }

  handlePosChange = id => pos => {
    this.nodesStore.changeNodePos(id, pos);
  };

  handleCanvasDrag = pos => {
    this.canvasStore.changeCanvasScrollPos(pos);
  };

  setScrollPosition = pos => {
    this.canvasStore.setCanvasScrollPos(pos);
  };

  render() {
    return (
      <NetworkCanvas
        viewerWidth={this.canvasStore.canvas.viewerWidth}
        viewerHeight={this.canvasStore.canvas.viewerHeight}
        canvasWidth={this.canvasStore.canvas.canvasWidth}
        canvasHeight={this.canvasStore.canvas.canvasHeight}
        scrollLeft={this.canvasStore.canvas.scrollLeft}
        scrollTop={this.canvasStore.canvas.scrollTop}
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
