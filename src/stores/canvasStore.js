import { observable, action } from 'mobx';

export class CanvasStore {
  @observable
  canvas = {
    viewerWidth: 400,
    viewerHeight: 400,
    canvasWidth: 500,
    canvasHeight: 500,
    scrollLeft: 0,
    scrollTop: 0
  };

  @action
  restoreCanvas(initialCanvas) {
    const {
      viewerWidth,
      viewerHeight,
      canvasWidth,
      canvasHeight,
      scrollLeft,
      scrollTop
    } = initialCanvas;
    this.canvas.viewerWidth = viewerWidth;
    this.canvas.viewerHeight = viewerHeight;
    this.canvas.canvasWidth = canvasWidth;
    this.canvas.canvasHeight = canvasHeight;
    this.canvas.scrollLeft = scrollLeft;
    this.canvas.scrollTop = scrollTop;
  }
  @action
  setCanvasScrollPos(pos) {
    this.canvas.scrollLeft = pos.left;
    this.canvas.scrollTop = pos.top;
  }
  @action
  handleNodePosChange(pos) {
    const leftDistance = this.canvas.scrollLeft - pos.x;
    const topDistance = this.canvas.scrollTop - pos.y;
    if (leftDistance >= 0) {
      this.canvas.scrollLeft -= leftDistance;
    }
    if (topDistance >= 0) {
      this.canvas.scrollTop -= topDistance;
    }

    const rightDistance =
      pos.x + 100 - this.canvas.viewerWidth - this.canvas.scrollLeft;
    const bottomDistance =
      pos.y + 100 - this.canvas.viewerHeight - this.canvas.scrollTop;
    if (rightDistance >= 0) {
      this.canvas.canvasWidth += rightDistance;
      this.canvas.scrollLeft += rightDistance;
    }
    if (bottomDistance >= 0) {
      this.canvas.canvasHeight += bottomDistance;
      this.canvas.scrollTop += bottomDistance;
    }
  }
  @action
  changeCanvasScrollPos(pos) {
    this.canvas.scrollLeft = this.canvas.scrollLeft - pos.left;
    this.canvas.scrollTop = this.canvas.scrollTop - pos.top;
  }
}

export default new CanvasStore();
