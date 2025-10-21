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

// Name of pentominos from https://en.wikipedia.org/wiki/Pentomino
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
    new THREE.Vector2(1, 0)
]);
const fGeometry = new THREE.ShapeGeometry(fShape);

const iShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 5),
    new THREE.Vector2(1, 5),
    new THREE.Vector2(1, 0)
]);
const iGeometry = new THREE.ShapeGeometry(iShape);

const lShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 4),
    new THREE.Vector2(1, 4),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(2, 0)
]);
const lGeometry = new THREE.ShapeGeometry(lShape);

const nShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 4),
    new THREE.Vector2(2, 4),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(1, 0)
]);
const nGeometry = new THREE.ShapeGeometry(nShape);

const pShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(2, 3),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(1, 0)
]);
const pGeometry = new THREE.ShapeGeometry(pShape);

const tShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(-1, 2),
    new THREE.Vector2(-1, 3),
    new THREE.Vector2(2, 3),
    new THREE.Vector2(2, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 0)
]);
const tGeometry = new THREE.ShapeGeometry(tShape);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const fPentomino = new THREE.Mesh(fGeometry, material);
const iPentomino = new THREE.Mesh(iGeometry, material);
const lPentomino = new THREE.Mesh(lGeometry, material);
const nPentomino = new THREE.Mesh(nGeometry, material);
const pPentomino = new THREE.Mesh(pGeometry, material);
const tPentomino = new THREE.Mesh(tGeometry, material);

fPentomino.scale.set(0.1, 0.1, 0.1);
iPentomino.scale.set(0.1, 0.1, 0.1);
lPentomino.scale.set(0.1, 0.1, 0.1);
nPentomino.scale.set(0.1, 0.1, 0.1);
pPentomino.scale.set(0.1, 0.1, 0.1);
tPentomino.scale.set(0.1, 0.1, 0.1);

fPentomino.position.x = -2.5;
iPentomino.position.x = -2.0;
lPentomino.position.x = -1.5;
nPentomino.position.x = -1.0;
pPentomino.position.x = -0.5;
tPentomino.position.x = 0.0;

scene.add(fPentomino);
scene.add(iPentomino);
scene.add(lPentomino);
scene.add(nPentomino);
scene.add(pPentomino);
scene.add(tPentomino);

camera.position.z = 5;

function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);