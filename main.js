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

// Define the shape of pentominos
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

const iShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 5),
    new THREE.Vector2(1, 5),
    new THREE.Vector2(1, 0)
]);

const lShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 4),
    new THREE.Vector2(1, 4),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(2, 0)
]);

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

const pShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(2, 3),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(1, 0)
]);

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

const vShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(1, 3),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(3, 1),
    new THREE.Vector2(3, 0)
]);

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

const shapes = [
    fShape,
    iShape,
    lShape,
    nShape,
    pShape,
    tShape,
    uShape,
    vShape,
    wShape,
    xShape,
    yShape,
    zShape
];

// Generate pentominos from given shapes
let pentominos = [];
let i = 0;
for (let shape of shapes) {
    const material = new THREE.MeshBasicMaterial({
        color: '#' + ((1 << 24) + (i++ * 0xabcdef11) % 0xffffff).toString(16).slice(1)
    });
    const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), material);
    mesh.scale.set(0.25, 0.25, 0.25);
    // Center on X
    mesh.geometry.computeBoundingBox();
    const xOffset = (mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x) / 2;
    mesh.position.x = -Math.floor(xOffset) * 0.25;
    mesh.position.y = 2.5;
    pentominos.push(mesh);
}

// Generate the grid
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const vLine = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector2(0, -3.75),
    new THREE.Vector2(0, 3.75)
]);
for (i = 0; i <= 20; i++) {
    const mesh = new THREE.Line(vLine, lineMaterial);
    mesh.position.x = -2.5 + i / 4;
    scene.add(mesh);
}

const hLine = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector2(-2.5, 0),
    new THREE.Vector2(2.5, 0)
]);
for (i = 0; i <= 30; i++) {
    const mesh = new THREE.Line(hLine, lineMaterial);
    mesh.position.y = -3.75 + i / 4;
    scene.add(mesh);
}

// Position the camera so we can actually see stuff
camera.position.z = 1;

// Main loop
let pentomino = null;
function animate() {
    // Generate pentomino
    if (pentomino === null) {
        pentomino = pentominos[Math.floor(Math.random() * pentominos.length)];
        scene.add(pentomino);
        renderer.render(scene, camera);
        return;
    }

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Handle keyboard input
function onKeyDown(event) {
    if (event.key === "ArrowLeft") {
        for (let pentomino of pentominos) pentomino.rotation.z += Math.PI / 2;
    } else if (event.key === "ArrowRight") {
        for (let pentomino of pentominos) pentomino.rotation.z -= Math.PI / 2;
    }
}
document.addEventListener('keydown', onKeyDown);