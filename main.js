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

const fShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 1),
    new THREE.Vector2(-1, 1),
    new THREE.Vector2(-1, 2),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(2, 3),
    new THREE.Vector2(2, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 0),
    new THREE.Vector2(0, 0)
]);
const fGeometry = new THREE.ShapeGeometry(fShape);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const fPentomino = new THREE.Mesh(fGeometry, material);
scene.add(fPentomino);

camera.position.z = 5;

function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);