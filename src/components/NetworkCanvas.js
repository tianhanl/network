import React from 'react';

// Automatically scroll viewport accroding to mousemove

class NetworkCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.viewer = React.createRef();
  }

  _previousLeft = 0;
  _previousTop = 0;
  isDraging = false;

  componentDidUpdate() {
    const viewerNode = this.viewer.current;
    const { scrollLeft, scrollTop } = this.props;
    viewerNode.scrollLeft = scrollLeft;
    viewerNode.scrollTop = scrollTop;
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
    const { handleCanvasDrag } = this.props;
    handleCanvasDrag(this.calculatePositionDifference(e));
  };

  handlePointerDown = e => {
    const { setScrollPosition } = this.props;
    const { pageX: left, pageY: top } = e;
    const viewerNode = this.viewer.current;
    this.isDraging = true;
    this._previousLeft = left;
    this._previousTop = top;
    const pos = {
      scrollLeft: viewerNode.scrollLeft,
      scrollTop: viewerNode.scrollTop
    };
    setScrollPosition(pos);
  };

  render() {
    const {
      viewerWidth,
      viewerHeight,
      canvasWidth,
      canvasHeight,
      children
    } = this.props;
    return (
      <div
        id={'network-container'}
        style={{
          border: '2px red solid',
          overflow: 'scroll',
          width: viewerWidth,
          height: viewerHeight
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
