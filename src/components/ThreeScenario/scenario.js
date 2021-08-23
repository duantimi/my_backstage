import * as THREE from 'three';
import Auxiliary from './auxiliary';
export default class ThreeScenario extends Auxiliary {
  constructor(option) {
    super(option);
    this._option = option || {};
    this.axesHelper = option.axesHelper || false;
    this.auxiliaryGgrid = option.auxiliaryGgrid || {};
    this.auxiliaryStats = option.auxiliaryStats || false;
    this.orbitControls = option.orbitControls || {};
    this.isDefaultInit = option.isDefaultInit || true;
    this.sideEffects = option.sideEffects || {};
    this.container = option.container ? option.container : document.body;
    this.width = option.rendererWidth ? option.rendererWidth : this.container.offsetWidth;
    this.height = option.rendererHeight ? option.rendererHeight : this.container.offsetHeight;
    this.renderer,
      this.camera,
      this.scene,
      this.gui,
      this.light,
      this.stats,
      this.controls,
      this.geometry,
      this.material,
      this.line,
      this.matLine,
      this.mesh,
      this.group,
      (this.radius = 5),
      this.groupDots,
      this.groupLines,
      this.groupHalo,
      this.aGroup;
    this.handleSideEffects();
    this.isDefaultInit && this.init();
  }

  /**
   * @description init 初始化
   */
  init() {
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initLight();
    this.axesHelper && this.initAxesHelper();
    this.auxiliaryGgrid.show && this.initAuxiliaryGgrid();
    this.auxiliaryStats && this.initStats();
    this.orbitControls.isStart && this.initControls();
    this.animate();
    this.initEvent();
    this.defaultInitHooks && this.defaultInitHooks();
  }

  /**
   * @description 初始化渲染场景
   */
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
    this.initrendererHooks && this.initrendererHooks();
  }

  /**
   * @description 初始化场景对象Scene
   */
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('0xa0a0a0');
    this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
    this.initSceneHooks && this.initSceneHooks();
  }

  /**
   * @description 初始化相机
   */
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
    this.camera.position.set(0.5, -2, 20);
    this.camera.lookAt(0, 3, 0);
    this.initcameraHooks && this.initcameraHooks();
  }

  /**
   * @description 初始化光
   */
  initLight() {
    const ambientLight = new THREE.AmbientLight(0xcccccc, 1.1);
    this.scene.add(ambientLight);
    this.initlightHooks && this.initlightHooks();
  }

  /**
   * @description 渲染
   */
  renders() {
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.rendersHooks && this.rendersHooks();
  }

  /**
   * @description 更新
   */
  animate() {
    window.requestAnimationFrame(() => {
      this.controls && this.controls.update();
      this.stats && this.stats.update();
      this.renders();
      this.animateHooks && this.animateHooks();
      this.animate();
    });
  }
}
