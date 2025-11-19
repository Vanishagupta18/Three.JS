import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'lil-gui';//lil-gui for UI controls

// ---- SCENE + CAMERA ----
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// ---- TEXTURE ----
const loader = new THREE.TextureLoader();
const texture = loader.load('/textures/wood.jpg');

// ---- CUBE ----
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;               // cube casts shadow
scene.add(cube);

// ---- LIGHTS ----
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;           // enable shadow casting
scene.add(dirLight);

// ---- GROUND ----
const planeGeo = new THREE.PlaneGeometry(20, 20);
const planeMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;           // ground receives shadow
scene.add(plane);

// ---- RENDERER ----
const canvas = document.querySelector('#draw');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;                    // enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


// ---- RESIZE HANDLER ----
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
// ---- lil GUI ----
const gui = new dat.GUI();
const cubeFolder = gui.addFolder("Cube Settings");
const materialFolder = gui.addFolder("Material Settings");
const lightFolder = gui.addFolder("Light Settings");

// Cube controls
const cubeSettings = {
  rotationSpeed: 0.01,
  visible: true
};

cubeFolder.add(cubeSettings, "rotationSpeed", 0, 0.1, 0.001);
cubeFolder.add(cube.position, "x", -5, 5, 0.01);
cubeFolder.add(cube.position, "y", -5, 5, 0.01);
cubeFolder.add(cube.position, "z", -5, 5, 0.01);
cubeFolder.add(cube.scale, "x", 0.1, 5, 0.01).name("scaleX");
cubeFolder.add(cube.scale, "y", 0.1, 5, 0.01).name("scaleY");
cubeFolder.add(cube.scale, "z", 0.1, 5, 0.01).name("scaleZ");
cubeFolder.add(cube, "visible");

// Material controls
materialFolder.addColor(material, "color");
materialFolder.add(material, "metalness", 0, 1, 0.01);
materialFolder.add(material, "roughness", 0, 1, 0.01);
materialFolder.add(material, "wireframe");
materialFolder.add(material, "map").name("Texture On/Off");

// Light controls
lightFolder.add(dirLight, "intensity", 0, 3, 0.01);
lightFolder.add(dirLight.position, "x", -20, 20, 0.1);
lightFolder.add(dirLight.position, "y", -20, 20, 0.1);
lightFolder.add(dirLight.position, "z", -20, 20, 0.1);
lightFolder.add(dirLight, "castShadow");
// ---- CONTROLS ----
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ---- ANIMATION LOOP ----
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
