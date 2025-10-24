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
let i = 1;
for (let shape of shapes) {
    const material = new THREE.MeshBasicMaterial({
        color: '#' + ((1 << 24) + (i++ * 0xabcdef11) % 0xffffff).toString(16).slice(1)
    });
    const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), material);
    mesh.scale.set(0.25, 0.25, 0.25);
    mesh.geometry.computeBoundingBox();
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

// Helper collision functions
function pentominoOutOfGrid(pentomino) {
    const box = new THREE.Box3().setFromObject(pentomino);
    return box.min.x < -2.5 || box.max.x > 2.5 || box.min.y < -3.75;
}

const CELL_SIZE = 0.25;
const Z_TEST_ORIGIN = 1; // ray origin z (above the pentomino plane)
const EPS = 1e-6;

function getOccupiedCells(mesh) {
    // Ensure world matrices are up-to-date
    mesh.updateMatrixWorld(true);

    // Compute world-space bounding box for the mesh
    const box = new THREE.Box3().setFromObject(mesh);
    const minX = Math.floor((box.min.x + EPS) / CELL_SIZE);
    const maxX = Math.floor((box.max.x - EPS) / CELL_SIZE);
    const minY = Math.floor((box.min.y + EPS) / CELL_SIZE);
    const maxY = Math.floor((box.max.y - EPS) / CELL_SIZE);

    const cells = new Set();
    for (let ix = minX; ix <= maxX; ix++) {
        const centerX = ix * CELL_SIZE + CELL_SIZE / 2;
        for (let iy = minY; iy <= maxY; iy++) {
            const centerY = iy * CELL_SIZE + CELL_SIZE / 2;

            // Cast a ray from above the plane through the cell center
            const _raycaster = new THREE.Raycaster(
                new THREE.Vector3(centerX, centerY, Z_TEST_ORIGIN),
                new THREE.Vector3(0, 0, -1)
            );

            const intersects = _raycaster.intersectObject(mesh, true);
            if (intersects.length > 0) cells.add(`${ix},${iy}`);
        }
    } return cells;
}

function pentominoCollides(pentomino, placedPentominos) {
    const pentominoCells = getOccupiedCells(pentomino);
    for (let placed of placedPentominos) {
        const placedCells = getOccupiedCells(placed);
        for (let cell of pentominoCells) if (placedCells.has(cell)) return true;
    } return false;
}

// Main loop
let pentomino = null;
let lastMotion = new THREE.Vector3();
let lastTime = 0;
let placed = [];
let gameOver = false;
function animate() {
    // Generate pentomino
    if (pentomino === null) {
        pentomino = pentominos[Math.floor(Math.random() * pentominos.length)];
        scene.add(pentomino);
        renderer.render(scene, camera);
        return;
    }

    const currentTime = performance.now();
    if (currentTime - lastTime > 250) {
        // Move pentomino down every second
        pentomino.position.y -= 0.25;
        lastMotion = new THREE.Vector3(0, -0.25, 0);
        lastTime = currentTime;
    }

    if (pentominoOutOfGrid(pentomino) || pentominoCollides(pentomino, placed)) {
        // Revert last motion if out of grid
        pentomino.position.x -= lastMotion.x;
        pentomino.position.y -= lastMotion.y;
        pentomino.rotation.z -= lastMotion.z;

        if (pentominoOutOfGrid(pentomino) || pentominoCollides(pentomino, placed)) {
            // If still colliding after revert, game over
            gameOver = true;
            alert("Game Over!");
            return;
        }

        // If the last motion was down, we need to lock the pentomino and generate a new one
        if (lastMotion.y < 0) {
            const lockedPentomino = pentomino.clone(); // Clone the pentomino to lock it in place

            // Reset pentomino to start position
            pentomino.position.set(0, 2.5, 0);
            pentomino.rotation.set(0, 0, 0);

            // Remove pentomino from scene
            scene.remove(pentomino);
            pentomino = null;

            // TODO: Check for completed rows

            // Keep the locked pentomino in the scene
            placed.push(lockedPentomino);
            scene.add(lockedPentomino);
        }
    }

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Handle keyboard input
function onKeyDown(event) {
    if (!pentomino) return; // If there's no pentomino currently, we have nothing to do
    if (event.key === "ArrowLeft") {
        pentomino.position.x -= 0.25;
        lastMotion = new THREE.Vector3(-0.25, 0, 0);
    }
    else if (event.key === "ArrowRight") {
        pentomino.position.x += 0.25;
        lastMotion = new THREE.Vector3(0.25, 0, 0);
    }
    else if (event.key === "ArrowUp") {
        pentomino.rotation.z += Math.PI / 2;
        pentomino.rotation.z %= 2 * Math.PI;
        lastMotion = new THREE.Vector3(0, 0, Math.PI / 2);
    }
    else if (event.key === "ArrowDown") {
        pentomino.position.y -= 0.25;
        lastMotion = new THREE.Vector3(0, -0.25, 0);
    }
}
document.addEventListener('keydown', onKeyDown);