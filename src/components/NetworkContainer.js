import React from 'react';
import NetworkCanvas from './NetworkCanvas';
import { Provider } from 'mobx-react';
import nodesStore from '../stores/nodesStore';
import canvasStore from '../stores/canvasStore';
import edgesStore from '../stores/edgesStore';
import NodeListContainer from './NodeListContainer';
import EdgesContainer from './EdgesContainer';

const stores = { nodesStore, canvasStore, edgesStore };

class NetworkContainer extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <NetworkCanvas>
          <EdgesContainer />
          <NodeListContainer />
        </NetworkCanvas>
      </Provider>
    );
  }
}

export default NetworkContainer;
