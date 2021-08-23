import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import SideEffects from './sideEffects';
export default class Auxiliary extends SideEffects {
  constructor(props) {
    super(props);
  }

  /**
   * @description 辅助轴线
   */
  initAxesHelper() {
    const helper = new THREE.AxesHelper(500);
    this.scene.add(helper);
    this.initAxesHelperHooks && this.initAxesHelperHooks();
  }

  /**
   * @description 辅助网格
   */
  initAuxiliaryGgrid() {
    const {
      size = 10,
      divisions = 10,
      colorCenterLine = 0x444444,
      colorGrid = 0x888888,
      opacity = 1,
      transparent = false,
    } = this.auxiliaryGgrid;
    const grid = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
    grid.material.opacity = opacity;
    grid.material.transparent = transparent;
    this.scene.add(grid);
    this.initAuxiliaryGgridHooks && this.initAuxiliaryGgridHooks();
  }

  /**
   * @description 性能插件
   */
  initStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
    this.initStatsHooks && this.initStatsHooks();
  }

  /**
   * @description 初始化用户交互
   */
  initControls() {
    const {
      enableZoom = false,
      minDistance = 0,
      maxDistance = 3000,
      enablePan = false,
      autoRotate = false,
      autoRotateSpeed = 2,
      enableDamping = true,
    } = this.orbitControls;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = enableZoom;
    this.controls.minDistance = minDistance;
    this.controls.maxDistance = maxDistance;
    this.controls.enablePan = enablePan;
    this.controls.autoRotate = autoRotate;
    this.controls.autoRotateSpeed = autoRotateSpeed;
    this.controls.enableDamping = enableDamping;
    this.initControlsHooks && this.initControlsHooks();
  }
}
