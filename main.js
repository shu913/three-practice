import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let isDown = false;
window.addEventListener('keydown', (keyEvent) => {
  switch (keyEvent.key) {
    case " ":
      isDown = true;
      break;
    default:
  }
});
window.addEventListener('keyup', (keyEvent) => {
  isDown = false;
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const scene = new THREE.Scene();
const group = new THREE.Group();
scene.add(group);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000.0,
);
camera.position.z = 15.0;

const directionalLight = new THREE.DirectionalLight(
  0xffffff,
  1.0,
);
directionalLight.position.set(1.0, 1.0, 1.0);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

const boxArray = [];
for (let i = 1; i < 100; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() * 2.0 - 1.0) * 5.0;
  mesh.position.y = (Math.random() * 2.0 - 1.0) * 5.0;
  mesh.position.z = (Math.random() * 2.0 - 1.0) * 5.0;
  group.add(mesh)
  boxArray.push(mesh);
}

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.autoRotate = true;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);

  if (isDown === true) {
    // group.rotation.x += 0.01;
    group.rotation.y += 0.01;
  }
}
animate();
