import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import wallTexture from '/brick.jpg';
// import GLTF loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

// Front wall
const fwalltext= new THREE.TextureLoader().load( wallTexture )
const frontwall = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ map: fwalltext })
);
frontwall.position.y = 2.5 / 2;
frontwall.position.z = 2;
frontwall.material.side = THREE.DoubleSide;
house.add(frontwall);

// Back wall
const bwalltext= new THREE.TextureLoader().load( wallTexture )
const backwall = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ map: bwalltext })
);
backwall.position.y = 2.5 / 2;
backwall.position.z = -2;
backwall.material.side = THREE.DoubleSide;
house.add(backwall);

// Right wall
const rwalltext= new THREE.TextureLoader().load( wallTexture )
const rightwall = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ map: rwalltext })
);
rightwall.position.x = 2;
rightwall.position.y = 2.5 / 2;
rightwall.position.z = 0;
rightwall.rotation.y = Math.PI / 2;
rightwall.material.side = THREE.DoubleSide;
house.add(rightwall);

// Left wall
const lwalltext= new THREE.TextureLoader().load( wallTexture )
const leftwall = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ map: lwalltext })
);
leftwall.position.x = -2;
leftwall.position.y = 2.5 / 2;
leftwall.position.z = 0;
leftwall.rotation.y = Math.PI / 2;
leftwall.material.side = THREE.DoubleSide;
house.add(leftwall);

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 2, 4),
    new THREE.MeshStandardMaterial({ color: "#BA4F26" })
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
floor.material.side = THREE.DoubleSide;
scene.add(floor);

// Wesp
let wesp;
const loader = new GLTFLoader();
loader.load( '/wesp.gltf', ( gltf )  => {
    wesp = gltf.scene;
    wesp.position.set(2, 2, 4);
    wesp.scale.set(0.2, 0.2, 0.2);
    wesp.rotation.set(0, -5, 0);
    scene.add( gltf.scene );
});

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

// animate wesp
function animateWesp() {
    requestAnimationFrame( animateWesp );
    wesp.rotation.y += 0.01;
    renderer.render( scene, camera );
};

animateWesp();