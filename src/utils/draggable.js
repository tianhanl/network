import React from 'react';
import PropTypes from 'prop-types';

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

const draggable = WrappedComponent => {
  class Draggable extends React.Component {
    // hidden parameters used
    _previousLeft = 0;
    _previousTop = 0;
    isDraging = false;

    // A function to hanlde change must be provided
    static propTypes = {
      handlePosChange: PropTypes.func
    };

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

    handlePointerDown = e => {
      this.isDraging = true;
      e.target.setPointerCapture(e.pointerId);
      this.calculatePositionDifference(e);
      e.stopPropagation();
    };

    handlePointerUp = e => {
      this.isDraging = false;
      e.stopPropagation();
    };

    handlePointerMove = e => {
      if (!this.isDraging) return;
      const { handlePosChange } = this.props;
      handlePosChange(this.calculatePositionDifference(e));
      e.stopPropagation();
    };

    render() {
      return (
        <WrappedComponent
          handlePointerDown={this.handlePointerDown}
          handlePointerUp={this.handlePointerUp}
          handlePointerMove={this.handlePointerMove}
          isDraging={this.isDraging}
          {...this.props}
        />
      );
    }
  }

  Draggable.displayName = `Draggable(${getDisplayName(WrappedComponent)})`;

  return Draggable;
};

export default draggable;
