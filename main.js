import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    -window.innerWidth / 200, window.innerWidth / 200,
    window.innerHeight / 200, -window.innerHeight / 200,
    1, 2
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define the shape of pentominos
// Name of pentominos from https://en.wikipedia.org/wiki/Pentomino
const fShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(),
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
    new THREE.Vector2(),
    new THREE.Vector2(0, 5),
    new THREE.Vector2(1, 5),
    new THREE.Vector2(1, 0)
]);

const lShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(),
    new THREE.Vector2(0, 4),
    new THREE.Vector2(1, 4),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(2, 0)
]);

const nShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 4),
    new THREE.Vector2(2, 4),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(1, 0)
]);

const pShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(2, 3),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(1, 0)
]);

const tShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(-1, 2),
    new THREE.Vector2(-1, 3),
    new THREE.Vector2(2, 3),
    new THREE.Vector2(2, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 0)
]);

const uShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(2, 2),
    new THREE.Vector2(3, 2),
    new THREE.Vector2(3, 0)
]);

const vShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(1, 3),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(3, 1),
    new THREE.Vector2(3, 0)
]);

const wShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(),
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
    new THREE.Vector2(),
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
    new THREE.Vector2(),
    new THREE.Vector2(0, 4),
    new THREE.Vector2(1, 4),
    new THREE.Vector2(1, 3),
    new THREE.Vector2(2, 3),
    new THREE.Vector2(2, 2),
    new THREE.Vector2(1, 2),
    new THREE.Vector2(1, 0)
]);

const zShape = new THREE.Shape().setFromPoints([
    new THREE.Vector2(),
    new THREE.Vector2(2, 0),
    new THREE.Vector2(2, 1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(1, 3),
    new THREE.Vector2(-1, 3),
    new THREE.Vector2(-1, 2),
    new THREE.Vector2(0, 2)
]);

const shapes = [
    fShape, iShape, lShape, nShape, pShape, tShape,
    uShape, vShape, wShape, xShape, yShape, zShape
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
const EPS = CELL_SIZE / 1000000; // small epsilon to avoid edge cases

// Get grid cells occupied by a mesh
function getOccupiedCells(mesh) {
    // Ensure world matrices are up-to-date
    mesh.updateMatrixWorld(true);

    // Compute world-space bounding box for the mesh
    const box = new THREE.Box3().setFromObject(mesh);
    const minX = Math.floor(box.min.x / CELL_SIZE + EPS);
    const maxX = Math.floor(box.max.x / CELL_SIZE - EPS);
    const minY = Math.floor(box.min.y / CELL_SIZE + EPS);
    const maxY = Math.floor(box.max.y / CELL_SIZE - EPS);

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

// Helper: Map cell string to mesh reference
function getCellMeshMap(placed) {
    const cellMeshMap = new Map();
    for (let mesh of placed) for (let cell of getOccupiedCells(mesh)) cellMeshMap.set(cell, mesh);
    return cellMeshMap;
}

// Helper: Find completed rows
function getCompletedRows(cellMeshMap) {
    const rowCounts = {};
    for (let cell of cellMeshMap.keys()) {
        const [, iy] = cell.split(',').map(Number);
        rowCounts[iy] = (rowCounts[iy] || 0) + 1;
    }
    // 20 columns per row (from -2.5 to 2.5 in steps of 0.25)
    return Object.entries(rowCounts)
        .filter(([_, count]) => count === 20)
        .map(([iy]) => Number(iy));
}

// Helper: Remove completed rows and drop above
let score = 0;
function clearRowsAndDrop(placed) {
    const cellMeshMap = getCellMeshMap(placed);
    const completedRows = getCompletedRows(cellMeshMap);
    if (completedRows.length === 0) return;

    // Remove cells in completed rows
    const toRemove = new Set();
    for (let iy of completedRows) {
        for (let ix = 0; ix <= 19; ix++) { // -2.5 to 2.25 in steps of 0.25
            toRemove.add(`${ix - 10},${iy}`);
        }
    }

    // Remove meshes that only occupy cleared cells
    for (let mesh of placed.slice()) {
        const meshCells = getOccupiedCells(mesh);
        if ([...meshCells].every(cell => toRemove.has(cell))) {
            scene.remove(mesh);
            placed.splice(placed.indexOf(mesh), 1);
        }
    }

    // Drop meshes above cleared rows
    for (let mesh of placed) {
        const meshCells = getOccupiedCells(mesh);
        let drop = 0;
        for (let iy of completedRows) {
            // If mesh is above cleared row, increment drop
            if ([...meshCells].some(cell => {
                const [, cy] = cell.split(',').map(Number);
                return cy > iy;
            })) drop++;
        } if (drop > 0) {
            mesh.position.y -= CELL_SIZE * drop;
            updateScoreText(score + drop * 100);
        }
    }
}

// Add score text element to DOM
const scoreDiv = document.createElement('div');
scoreDiv.style.position = 'absolute';
scoreDiv.style.top = '10px';
scoreDiv.style.left = '10px';
scoreDiv.style.color = 'white';
scoreDiv.style.font = 'bold 32px monospace';
scoreDiv.style.textShadow = '1px 1px 4px #ddd';
scoreDiv.innerText = 'Score: 0000';
document.body.appendChild(scoreDiv);

function updateScoreText(newScore) {
    score = newScore !== undefined ? newScore : score;
    if (!scoreDiv) return;
    let scoreText = score;
    if (score < 10) scoreText = '000' + score;
    else if (score < 100) scoreText = '00' + score;
    else if (score < 1000) scoreText = '0' + score;
    scoreDiv.innerText = 'Score: ' + scoreText;
}

// Main loop
let pentomino = null;
let lastMotion = new THREE.Vector3();
let placed = [];
function animate() {
    // Generate pentomino
    if (pentomino === null) {
        pentomino = pentominos[Math.floor(Math.random() * pentominos.length)];
        scene.add(pentomino);
        renderer.render(scene, camera);
        return;
    }

    if (performance.now() % 15 === 0) {
        pentomino.position.y -= 0.25;
        lastMotion = new THREE.Vector3(0, -0.25, 0);
    }

    if (pentominoOutOfGrid(pentomino) || pentominoCollides(pentomino, placed)) {
        // Revert last motion if out of grid
        pentomino.position.x -= lastMotion.x;
        pentomino.position.y -= lastMotion.y;
        pentomino.rotation.z -= lastMotion.z;

        // If still colliding after revert, game over
        if (pentominoCollides(pentomino, placed) && pentomino.position.y === 2.5) {
            alert("Game Over!\n\nScore: " + score);

            // Reset game
            for (let mesh of placed) scene.remove(mesh);
            placed = [];
            scene.remove(pentomino);
            pentomino = null;
            lastMotion.set(0, 0, 0);
            updateScoreText(0);
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

            // Keep the locked pentomino in the scene
            placed.push(lockedPentomino);
            scene.add(lockedPentomino);

            // Clear completed rows
            clearRowsAndDrop(placed);

            // Add score
            updateScoreText(score + 10);
        }
    } renderer.render(scene, camera);
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