// Import Babylon.js library
import * as BABYLON from 'babylonjs';

// Get the canvas element
const canvas = document.getElementById('renderCanvas');

// Create a Babylon.js engine
const engine = new BABYLON.Engine(canvas, true);

// Create a scene
const scene = new BABYLON.Scene(engine);

// Create a camera
const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);

// Create a light
const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

// Create a box
const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene);

// Run the render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Handle window resize
window.addEventListener('resize', () => {
    engine.resize();
});
