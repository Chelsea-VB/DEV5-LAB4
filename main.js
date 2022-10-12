import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Renderer, to draw in the canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setClearColor("#87cefa");

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// House
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ color:'#ac8e82' })
);
walls.position.y = 2.5 / 2;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 2, 4),
    new THREE.MeshStandardMaterial({ color:'#b35f45' })
);
roof.position.y = 2.5 + 1; // walls height + roof height/2
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 2),
    new THREE.MeshStandardMaterial({ color: "#ffffff" })
);
door.position.y = 1;
door.position.z = 2 + 0.01; // walls depth 4/2 + 0.01 to avoid z-fighting
house.add(door);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color:'#a9c388' })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// Light
// Ambient light
const ambientLight = new THREE.AmbientLight("#daeefe", 0.5); // color, intensity
scene.add(ambientLight);
// Directional light
const directionalLight = new THREE.DirectionalLight("#FFF6E5", 0.8);
directionalLight.position.x = 2;
directionalLight.position.y = 4;
directionalLight.position.z = 4;
scene.add(directionalLight);
// add directional light helper
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2);
// scene.add(directionalLightHelper);

camera.position.z = 10; // move backward
camera.position.y = 3;

function animate() {
	requestAnimationFrame( animate );

    renderer.render( scene, camera );
};

animate();