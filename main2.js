import * as THREE from 'three';

window.addEventListener('DOMContentLoaded', async () => {
  const app = new App();
  await app.load();
  app.init();
  app.render();
});
