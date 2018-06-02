import React from 'react';
import CanvasContainer from './CanvasContainer';
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
        <CanvasContainer>
          <EdgesContainer />
          <NodeListContainer />
        </CanvasContainer>
      </Provider>
    );
  }
}

export default NetworkContainer;
