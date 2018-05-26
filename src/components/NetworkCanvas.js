import React from 'react';

// Automatically scroll viewport accroding to mousemove

class NetworkCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientX: 0,
      clientY: 0,
      scrollLeft: 0,
      scrollTop: 0
    };
    this.isDraging = false;
    this.viewer = React.createRef();
  }

  handleMouseUp = e => {
    this.isDraging = false;
  };

  handleMouseMove = e => {
    if (!this.isDraging) return;
    const { clientX, clientY, scrollLeft, scrollTop } = this.state;
    const viewerNode = this.viewer.current;
    viewerNode.scrollLeft = scrollLeft - e.clientX + clientX;
    viewerNode.scrollTop = scrollTop - e.clientY + clientY;
  };

  handleMouseDown = e => {
    const viewerNode = this.viewer.current;
    this.isDraging = true;
    this.setState({
      scrollLeft: viewerNode.scrollLeft,
      scrollTop: viewerNode.scrollTop,
      clientX: e.clientX,
      clientY: e.clientY
    });
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
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <svg width={canvasWidth} height={canvasHeight}>
          {children}
        </svg>
      </div>
    );
  }
}

export default NetworkCanvas;
