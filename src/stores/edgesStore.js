import { observable, action } from 'mobx';

export class EdgesStore {
  @observable edges = observable.array();

  @action
  restoreEdges(initialEdges) {
    initialEdges.forEach(edge => {
      this.edges.push(...initialEdges);
    });
  }

  @action
  addEdge(fromNodeId, toNodeId) {
    this.edges.push({
      id: Math.random(),
      fromNodeId: fromNodeId,
      toNodeId: toNodeId
    });
  }
}

export default new EdgesStore();
