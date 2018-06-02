import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
export default class componentName extends Component {
  static propTypes = {
    fromNode: PropTypes.object,
    toNode: PropTypes.object
  };

  render() {
    const { fromNode, toNode } = this.props;
    return (
      <line
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        stroke="#9F9F9F"
      />
    );
  }
}
