import * as THREE from 'three';
import { loadMTLAndOBJ, loadGLTF } from './model';

const _scenario = _interopRequireDefault(require('./scenario'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

export default _scenario.default;
export { THREE, loadMTLAndOBJ, loadGLTF };
