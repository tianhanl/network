import React from 'react';
import NetworkCanvas from './NetworkCanvas';
import nodesStore from '../stores/nodesStore';
import canvasStore from '../stores/canvasStore';
import { Provider } from 'mobx-react';
import NodeListContainer from './NodeListContainer';

const stores = { nodesStore, canvasStore };

class NetworkContainer extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <NetworkCanvas>
          <NodeListContainer />
        </NetworkCanvas>
      </Provider>
    );
  }
}

export default NetworkContainer;
