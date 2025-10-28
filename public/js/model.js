// ✅ Import Three.js, OrbitControls & GLTFLoader
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// ✅ Create the scene
const scene = new THREE.Scene();

// ✅ Get the container div
const container = document.getElementById("container3D");

// ✅ Create the camera (based on container size)
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5); // Better starting angle

// ✅ Renderer setup – match only container size
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// ✅ Lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// ✅ OrbitControls (allow mouse drag/zoom)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// ✅ Load your model
const loader = new GLTFLoader();
loader.load(
  './model/scene.gltf',
  function (gltf) {
    const object = gltf.scene;
    scene.add(object);

    // ✅ Scale if needed
    object.scale.set(0.1, 0.1, 0.1);

    // ✅ Center model
    object.position.set(0, 13, 0);
    object.rotation.set(0, Math.PI / 2, 0);

    // ✅ Auto adjust camera distance
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // ✅ Move camera back based on model size
    const fitDistance = maxDim * 0.8; // adjust how far camera is (1.0, 1.5, etc.)

    // ✅ Move camera in FRONT (Z axis instead of X)
    camera.position.set(-fitDistance * 0.4, maxDim * 0.3, fitDistance);
    camera.lookAt(0, -0.9, 0);


    console.log("✅ Camera adjusted to fit model");

    // ✅ Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // ❌ removed auto-rotate here
      object.rotation.y += 0.002;
      controls.update();  // ✅ only updates camera when user drags/zooms
      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  function (error) {
    console.error("❌ Error loading model:", error);
  }
);



// ✅ Handle window resize – updates renderer & camera based on container
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});