import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(80);

// Create renderer
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup OrbitControls (Camera Movement from user)
const controls = new OrbitControls(camera, renderer.domElement);

// Avatar Cube
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('fredella_shot.jpeg') })
);
cube.position.set(5,1,-10);
// cube.rotation.y=0.67;
scene.add(cube);

// Create a Torus
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({ color: 0xfffff , wireframe: false });
const torus = new THREE.Mesh(geometry, material);
torus.position.y=-10;
torus.position.x=-10;
torus.position.z=10;
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff,100,1000);
pointLight.position.set(10,10,10);
// const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(pointLight, pointLightHelper, gridHelper);

// Background
const bkg = new THREE.TextureLoader().load('backgr.jpg');
scene.background = bkg;



function addStar() {
    const geometry = new THREE.TorusKnotGeometry(.25,.1,8,16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.01;
    camera.rotation.y = t * -0.0002;
    cube.rotation.y -= 0.01;
}
document.body.onscroll = moveCamera;
moveCamera();


function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    // moveCamera();

    controls.update();
    renderer.render(scene, camera);
}
animate();