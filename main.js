import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000.0,
);
camera.position.z = 5.0;

const directionalLight = new THREE.DirectionalLight(
  0xffffff,
  1.0,
);
directionalLight.position.set(1.0, 1.0, 1.0);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
