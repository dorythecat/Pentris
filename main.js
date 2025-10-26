import * as THREE from 'three';

// Check that WebGL is supported
if (!window.WebGLRenderingContext) window.location = "https://get.webgl.org";

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    -window.innerWidth / 200, window.innerWidth / 200,
    3.75, -3.76,
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
const CELL_SIZE = 0.25;
let pentominos = [];
for (let i = 1; i <= shapes.length; i++) {
    const material = new THREE.MeshBasicMaterial({
        color: '#' + ((1 << 24) + (i * 0xabcdef11) % 0xdddddd + 0x222222).toString(16).slice(1)
    });
    const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shapes[i - 1]), material);
    mesh.scale.set(CELL_SIZE, CELL_SIZE, 1);
    mesh.geometry.computeBoundingBox();
    mesh.position.set(0, 2.5, 0);
    pentominos.push(mesh);
}

// Generate the grid
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const vMesh = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector2(-2.5, -3.75),
    new THREE.Vector2(-2.5, 3.75)
]), lineMaterial);
const hMesh = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector2(-2.5, -3.75),
    new THREE.Vector2(2.5, -3.75)
]), lineMaterial);
scene.add(hMesh);
scene.add(vMesh);
for (let i = CELL_SIZE; i <= 30 * CELL_SIZE; i += CELL_SIZE) {
    const hMeshClone = hMesh.clone();
    hMeshClone.position.y = i;
    scene.add(hMeshClone);
    if (i > 20 * CELL_SIZE) continue; // Only 20 vertical divisions
    const vMeshClone = vMesh.clone();
    vMeshClone.position.x = i;
    scene.add(vMeshClone);
}

// Position the camera so we can actually see stuff
camera.position.z = 1;

// Add score text element to DOM
const scoreDiv = document.createElement('div');
scoreDiv.id = 'score';
scoreDiv.innerText = 'Score: 0000';
document.body.appendChild(scoreDiv);

// Update score text
let score = 0;
function updateScoreText(newScore = 0) {
    score = newScore;
    scoreDiv.innerText = 'Score: ' + '0'.repeat(4 - score.toString().length) + score;
}

const raycaster = new THREE.Raycaster();
function getOccupiedCells(mesh) {
    // Ensure world matrices are up-to-date
    mesh.updateMatrixWorld(true);

    // Compute world-space bounding box for the mesh
    const box = new THREE.Box3().setFromObject(mesh);
    const minX = Math.floor(box.min.x / CELL_SIZE);
    const maxX = Math.floor(box.max.x / CELL_SIZE);
    const minY = Math.floor(box.min.y / CELL_SIZE);
    const maxY = Math.floor(box.max.y / CELL_SIZE);

    const cells = new Set();
    for (let ix = minX; ix <= maxX; ix++) {
        const centerX = ix * CELL_SIZE + CELL_SIZE / 2;
        for (let iy = minY; iy <= maxY; iy++) {
            const centerY = iy * CELL_SIZE + CELL_SIZE / 2;
            raycaster.set(new THREE.Vector3(centerX, centerY, 1),
                          new THREE.Vector3(0, 0, -1));
            if (raycaster.intersectObject(mesh, true).length > 0) cells.add(`${ix},${iy}`);
        }
    } return cells;
}

function pentominoCollides(pentomino, placedPentominos) {
    return [...getOccupiedCells(pentomino)].some(cell =>
        [...placedPentominos].some(placed => getOccupiedCells(placed).has(cell)));
}

// Helper: Remove completed rows and drop above
function clearRowsAndDrop(placed) {
    const rowCounts = {};
    placed.forEach(mesh => getOccupiedCells(mesh).forEach(cell => {
        const iy = Number(cell.split(',')[1]);
        rowCounts[iy] = (rowCounts[iy] || 0) + 1;
    }));

    const completedRows = Object.entries(rowCounts)
        .filter(count => count[1] === 20)
        .map(i => Number(i[0]));
    if (completedRows.length === 0) return;

    // Remove cells in completed rows
    const toRemove = new Set();
    completedRows.forEach(iy => {
        // -2.5 to 2.25 in steps of 0.25
        for (let ix = 0; ix <= 19; ix++) toRemove.add(`${ix - 10},${iy}`);
    });

    // Remove meshes that only occupy cleared cells
    placed.slice().forEach(mesh => {
        if ([...getOccupiedCells(mesh)].some(cell => !toRemove.has(cell))) return;
        scene.remove(mesh);
        placed.splice(placed.indexOf(mesh), 1);
    });

    // Drop meshes above cleared rows
    placed.forEach(mesh => {
        let drop = 0;
        completedRows.forEach(iy => { // If mesh is above cleared row, increment drop
            if ([...getOccupiedCells(mesh)].some(cell => cell.split(',').map(Number)[1] > iy)) drop++;
        }); if (drop <= 0) return;
        mesh.position.y -= drop * CELL_SIZE;
        updateScoreText(score + drop * drop * 100);
    });
}

// Helper: Check out-of-bounds
function outOfBounds(pentomino) {
    const box = new THREE.Box3().setFromObject(pentomino);
    return box.min.x < -2.5 || box.max.x > 2.5 || box.min.y < -3.75;
}

// Handle keyboard input
let pentomino = null;
let placed = [];
let lastMotion = new THREE.Vector3();
function onKeyDown(event) {
    if (!pentomino) return;

    switch (event.key) {
        case "ArrowLeft":
            pentomino.position.x -= CELL_SIZE;
            lastMotion = new THREE.Vector3(-CELL_SIZE, 0, 0);
            break;
        case "ArrowRight":
            pentomino.position.x += CELL_SIZE;
            lastMotion = new THREE.Vector3(CELL_SIZE, 0, 0);
            break;
        case "ArrowUp":
            pentomino.rotation.z += Math.PI / 2;
            pentomino.rotation.z %= 2 * Math.PI;
            lastMotion = new THREE.Vector3(0, 0, Math.PI / 2);
            break;
        case "ArrowDown":
            pentomino.position.y -= CELL_SIZE;
            lastMotion = new THREE.Vector3(0, -CELL_SIZE, 0);
            break;
        case " ": // Hard drop
            while (true) {
                pentomino.position.y -= CELL_SIZE;
                if (!outOfBounds(pentomino) && !pentominoCollides(pentomino, placed)) continue;
                pentomino.position.y += CELL_SIZE;
                break;
            } break;
        default: return; // Ignore other keys
    }

    // After move, check for collision or out-of-bounds
    if (!outOfBounds(pentomino) && !pentominoCollides(pentomino, placed)) return;
    pentomino.position.x -= lastMotion.x;
    pentomino.position.y -= lastMotion.y;
    pentomino.rotation.z -= lastMotion.z;
} document.addEventListener('keydown', onKeyDown);

// Main loop
function animate() {
    // Generate pentomino
    if (pentomino === null) {
        pentomino = pentominos[Math.floor(Math.random() * pentominos.length)].clone();
        if (Math.random() < 0.5) pentomino.scale.set(-CELL_SIZE, CELL_SIZE, 1); // Mirror horizontally
        scene.add(pentomino);
        renderer.render(scene, camera);
        return;
    }

    if (performance.now() % 15 === 0) {
        pentomino.position.y -= CELL_SIZE;
        lastMotion = new THREE.Vector3(0, -CELL_SIZE, 0);
    }

    if (!outOfBounds(pentomino) && !pentominoCollides(pentomino, placed)) {
        renderer.render(scene, camera);
        return;
    }

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
        updateScoreText();
        return;
    }

    if (lastMotion.y >= 0) {
        renderer.render(scene, camera);
        return;
    }

    // Place pentomino
    placed.push(pentomino);
    pentomino = null;
    clearRowsAndDrop(placed);

    // Add score
    updateScoreText(score + 10);

    renderer.render(scene, camera);
} renderer.setAnimationLoop(animate);