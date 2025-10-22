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

const uShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(2, 2),
    new THREE.Vector2(3, 2),
    new THREE.Vector2(3, 0)
]);
const uGeometry = new THREE.ShapeGeometry(uShape);

const vShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(1, 3),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(3, 1),
    new THREE.Vector2(3, 0)
]);
const vGeometry = new THREE.ShapeGeometry(vShape);

const wShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 1),
    new THREE.Vector2(-1, 1),
    new THREE.Vector2(-1, 3),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(2, 0),
]);
const wGeometry = new THREE.ShapeGeometry(wShape);

const xShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 1),
    new THREE.Vector2(-1, 1),
    new THREE.Vector2(-1, 2),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(1, 3),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(2, 2),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(1, 0)
]);
const xGeometry = new THREE.ShapeGeometry(xShape);

const yShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 4),
    new THREE.Vector2(1, 4),
    new THREE.Vector2(1, 3),
    new THREE.Vector2(2, 3),
    new THREE.Vector2(2, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 0)
]);
const yGeometry = new THREE.ShapeGeometry(yShape);

const zShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(2, 0),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(1, 3),
    new THREE.Vector2(-1, 3),
    new THREE.Vector2(-1, 2),
    new THREE.Vector2(0, 2)
]);
const zGeometry = new THREE.ShapeGeometry(zShape);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const geometries = [
    fGeometry,
    iGeometry,
    lGeometry,
    nGeometry,
    pGeometry,
    tGeometry,
    uGeometry,
    vGeometry,
    wGeometry,
    xGeometry,
    yGeometry,
    zGeometry
];
let pentominos = [];
let i = 0;
for (let geom of geometries) {
    const mesh = new THREE.Mesh(geom, material);
    mesh.scale.set(0.1, 0.1, 0.1);
    mesh.position.x = -2.5 + 0.5 * i;
    i++;
    scene.add(mesh);
    pentominos.push(mesh);
}

camera.position.z = 5;

function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

function onKeyDown(event) {
    if (event.key === "ArrowLeft") {
        for (let pentomino of pentominos) {
            pentomino.rotation.z += Math.PI / 2;
        }
    } else if (event.key === "ArrowRight") {
        for (let pentomino of pentominos) {
            pentomino.rotation.z -= Math.PI / 2;
        }
    }
}
document.addEventListener('keydown', onKeyDown);