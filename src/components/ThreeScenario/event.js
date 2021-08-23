import { Interaction } from 'three.interaction';
export default class Event {
  constructor(props) {}

  /**
   * @description 初始化 Interaction
   */
  initEvent() {
    const interaction = new Interaction(this.renderer, this.scene, this.camera);
  }
}
