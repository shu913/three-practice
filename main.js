import * as THREE from 'three';

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

const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
