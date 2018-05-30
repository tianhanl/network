import { observable, action } from 'mobx';

export class NodesStore {
  @observable nodes = observable.map();
  @action
  initializeNodes(initialNodes) {
    initialNodes.forEach(node => {
      this.nodes.set(node.id, node);
    });
  }
  @action
  changeNodePos(id, pos) {
    this.nodes.get(id).x = pos.x;
    this.nodes.get(id).y = pos.y;
  }
  @action
  addNode(node) {
    this.nodes.set(node.id, node);
  }
}

export default new NodesStore();
