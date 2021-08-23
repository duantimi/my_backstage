import Event from './event';
import { forEach } from 'lodash';
export default class SideEffects extends Event {
  constructor(props) {
    super(props);
  }

  /**
   * @description 事件管理
   */
  handleSideEffects() {
    forEach(this.sideEffects, (fn, name) => {
      this[name] = () => {
        fn.apply(this);
      };
    });
    return this;
  }
}
