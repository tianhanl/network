import React from 'react';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';

const sampleCanvas = {
  viewerWidth: 600,
  viewerHeight: 600,
  canvasWidth: 700,
  canvasHeight: 700,
  scrollLeft: 0,
  scrollTop: 0
};

// Automatically scroll viewport accroding to mousemove
@inject('canvasStore')
@observer
class NetworkCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.viewer = React.createRef();
  }

  _previousLeft = 0;
  _previousTop = 0;
  isDraging = false;

  componentDidMount() {
    const { canvasStore } = this.props;
    canvasStore.restoreCanvas(sampleCanvas);
    autorun(() =>
      this.scrollViewerTo(
        canvasStore.canvas.scrollLeft,
        canvasStore.canvas.scrollTop
      )
    );
  }

  scrollViewerTo(left, top) {
    const viewerNode = this.viewer.current;
    viewerNode.scrollLeft = left;
    viewerNode.scrollTop = top;
  }

  calculatePositionDifference = e => {
    const { pageX: left, pageY: top } = e;
    const difference = {
      left: left - this._previousLeft,
      top: top - this._previousTop
    };
    this._previousLeft = left;
    this._previousTop = top;
    return difference;
  };

  handlePointerUp = e => {
    this.isDraging = false;
  };

  handlePointerMove = e => {
    if (!this.isDraging) return;
    this.props.canvasStore.changeCanvasScrollPos(
      this.calculatePositionDifference(e)
    );
  };

  handlePointerDown = e => {
    const { pageX: left, pageY: top } = e;
    const viewerNode = this.viewer.current;
    this.isDraging = true;
    this._previousLeft = left;
    this._previousTop = top;
    const pos = {
      left: viewerNode.scrollLeft,
      top: viewerNode.scrollTop
    };
    this.props.canvasStore.setCanvasScrollPos(pos);
  };

  render() {
    const { canvasStore, children } = this.props;
    const {
      viewerWidth,
      viewerHeight,
      canvasWidth,
      canvasHeight
    } = canvasStore.canvas;

    return (
      <div
        id={'network-container'}
        style={{
          border: '2px red solid',
          overflow: 'scroll',
          width: viewerWidth,
          height: viewerHeight,
          cursor: 'move'
        }}
        ref={this.viewer}
        onPointerDown={this.handlePointerDown}
        onPointerUp={this.handlePointerUp}
        onPointerMove={this.handlePointerMove}
      >
        <svg width={canvasWidth} height={canvasHeight}>
          {children}
        </svg>
      </div>
    );
  }
}

export default NetworkCanvas;
