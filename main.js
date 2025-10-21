import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -200,
    window.innerWidth / 200,
    window.innerHeight / 200,
    window.innerHeight / -200,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sqGeometry = new THREE.BoxGeometry(1, 1, 0);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const square = new THREE.Mesh(sqGeometry, material);
scene.add(square);

camera.position.z = 5;

function animate() {
    square.rotation.x += 0.01;
    square.rotation.y += 0.01;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);