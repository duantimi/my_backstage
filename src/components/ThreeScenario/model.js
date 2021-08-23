import * as THREE from 'three';
import { noop } from 'lodash';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 *
 * @param {string} options.entryPath
 * @param {string} options.mtlFileName
 * @param {string} options.objFileName
 * @returns {Promise<any>}
 */
export const loadMTLAndOBJ = (options = {}) => {
  return new Promise((resolve, reject) => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(options.entryPath);
    mtlLoader.load(
      options.mtlFileName,
      (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(options.entryPath);
        objLoader.load(
          options.objFileName,
          (object) => {
            object.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                // 重点，没有该句会导致PNG无法正确显示透明效果
                child.material.transparent = true;
              }
            });

            resolve(object);
          },
          noop,
          (err) => reject(err)
        );
      },
      noop,
      (err) => reject(err)
    );
  });
};

/**
 *
 * @param {string} options.entryPath
 * @param {string} options.gltfFileName
 * @returns {Promise<any>}
 */
export const loadGLTF = (options = {}) => {
  return new Promise((resolve, reject) => {
    const gLTFLoader = new GLTFLoader();
    gLTFLoader.setPath(options.entryPath);
    gLTFLoader.load(
      options.gltfFileName,
      (gltf) => {
        const object = gltf.scene;
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // 重点，没有该句会导致PNG无法正确显示透明效果
            child.geometry.rotateY(-Math.PI);
            child.castShadow = true;
            child.material.transparent = true;
          }
        });
        resolve(object);
      },
      noop,
      (err) => reject(err)
    );
  });
};
