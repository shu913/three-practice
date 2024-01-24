import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';

window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.load().then(() => {
    app.init();
    app.render();
  })
});

class App {
  static get MATERIAL_PARAM() {
    return {
      color: 0xffffff,
      // transparent: true,
      // opacity: 0.5,
      // side: THREE.FrontSide,
    }
  }

  constructor() {
    this.scene;
    this.group;
    this.renderer;
    this.camera;
    this.directionalLight;
    this.geometry;
    this.material;
    this.box;
    this.texture;
    this.controls;

    this.composer;
    this.renderPass;
    this.glitchPass;
    this.dotScreenPass;

    this.render = this.render.bind(this);

    this.isDown = false;

    window.addEventListener('keydown', (keyEvent) => {
      switch (keyEvent.key) {
        case " ":
          this.isDown = true;
          break;
        default:
      }
    });
    window.addEventListener('keyup', (keyEvent) => {
      this.isDown = false;
    });

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });
  }

  load() {
    return new Promise((resolve) => {
      const imgPath = 'img-1.jpg';
      const loader = new THREE.TextureLoader();
      loader.load(imgPath, (texture) => {
        this.texture = texture;
        resolve();
      });
    });
  }

  init() {
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000.0,
    );
    this.camera.position.z = 15.0;

    this.directionalLight = new THREE.DirectionalLight(
      0xffffff,
      1.0,
    );
    this.directionalLight.position.set(1.0, 1.0, 1.0);
    this.scene.add(this.directionalLight);

    this.geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    this.material = new THREE.MeshLambertMaterial(App.MATERIAL_PARAM);
    this.material.map = this.texture;

    const boxArray = [];
    for (let i = 1; i < 100; i++) {
      this.box = new THREE.Mesh(this.geometry, this.material);
      this.box.position.x = (Math.random() * 2.0 - 1.0) * 5.0;
      this.box.position.y = (Math.random() * 2.0 - 1.0) * 5.0;
      this.box.position.z = (Math.random() * 2.0 - 1.0) * 5.0;
      this.group.add(this.box);
      boxArray.push(this.box);
    }

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.enableDamping = true;
    // controls.autoRotate = true;

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    this.glitchPass = new GlitchPass();
    this.composer.addPass(this.glitchPass);
    this.dotScreenPass = new DotScreenPass();
    this.composer.addPass(this.dotScreenPass);
  }

  render() {
    requestAnimationFrame(this.render);
    // this.controls.update();
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();

    if (this.isDown === true) {
      // this.group.rotation.x += 0.01;
      this.group.rotation.y += 0.01;
    }
  }
}
