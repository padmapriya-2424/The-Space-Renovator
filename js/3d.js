// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a simple ambient light to illuminate the scene
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
scene.add(ambientLight);

// Add a directional light (to simulate sunlight) for better shadows and depth
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increased intensity
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Create the floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2; // Rotate to make it horizontal
scene.add(floor);

// Create the walls
const wallGeometry = new THREE.BoxGeometry(10, 5, 0.1);
const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });

// Wall 1 (Front)
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, 2.5, -5); // Position it on the z-axis
scene.add(wall1);

// Wall 2 (Back)
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(0, 2.5, 5);
wall2.rotation.y = Math.PI; // Rotate 180 degrees
scene.add(wall2);

// Wall 3 (Left)
const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
wall3.position.set(-5, 2.5, 0);
wall3.rotation.y = Math.PI / 2; // Rotate 90 degrees
scene.add(wall3);

// Wall 4 (Right)
const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
wall4.position.set(5, 2.5, 0);
wall4.rotation.y = -Math.PI / 2; // Rotate -90 degrees
scene.add(wall4);

// Create the ceiling
const ceilingGeometry = new THREE.PlaneGeometry(10, 10);
const ceilingMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.set(0, 5, 0); // Position above the walls
scene.add(ceiling);

// Camera positioning (closer to the scene)
camera.position.set(0, 3, 15); // Position the camera closer to the scene (z = 15)

// Ensure the camera is looking at the center of the scene
camera.lookAt(new THREE.Vector3(0, 2.5, 0));

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
