import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { STLLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.SpotLight();
light.position.set(20, 20, 20);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(3, 5, 8);
camera.lookAt(10, 10, 0);

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const material = new THREE.MeshNormalMaterial();

const group = new THREE.Group();
const group2 = new THREE.Group();
const group3 = new THREE.Group();

let meshGrundplatte, meshSockel, meshAusleger1, meshAusleger2;

const loader = new STLLoader();

loader.load(
	"models/01_Grundplatte.stl",
	function (geometry) {
		meshGrundplatte = new THREE.Mesh(geometry, material);
		meshGrundplatte.scale.set(0.005, 0.005, 0.005);
		meshGrundplatte.rotation.x = -Math.PI / 2;
		scene.add(meshGrundplatte);
	},
	(xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	(error) => {
		console.log(error);
	}
);

loader.load(
	"models/04_Ausleger_2.stl",
	function (geometry) {
		meshAusleger2 = new THREE.Mesh(geometry, material);
		meshAusleger2.scale.set(0.005, 0.005, 0.005);
		meshAusleger2.rotation.x = -Math.PI / 2;

		group.add(meshAusleger2);

		const offsetX = 1.299;
		const offsetY = 3.45;

		meshAusleger2.position.set(-offsetX, -offsetY, 0);
		group.position.set(offsetX, offsetY, 0);
		scene.add(group);
	},
	(xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	(error) => {
		console.log(error);
	}
);

loader.load(
	"models/03_Ausleger_1.stl",
	function (geometry) {
		meshAusleger1 = new THREE.Mesh(geometry, material);
		meshAusleger1.scale.set(0.005, 0.005, 0.005);
		meshAusleger1.rotation.x = -Math.PI / 2;

		group2.add(meshAusleger1);
		let grp = new THREE.Group();
		grp.add(group);
		group2.add(grp);

		const offsetX = 0.9;
		const offsetY = 0.6;

		meshAusleger1.position.set(-offsetX, -offsetY, 0);
		grp.position.set(-offsetX, -offsetY, 0);
		group2.position.set(offsetX, offsetY, 0);

		scene.add(group2);
	},
	(xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	(error) => {
		console.log(error);
	}
);

loader.load(
	"models/02_Sockel.stl",
	function (geometry) {
		meshSockel = new THREE.Mesh(geometry, material);
		meshSockel.scale.set(0.005, 0.005, 0.005);
		meshSockel.rotation.x = -Math.PI / 2;

		group3.add(meshSockel);
		let grp = new THREE.Group();
		grp.add(group2);
		group3.add(grp);

		const offsetX = 0.9;
		const offsetY = 0.6;

		meshSockel.position.set(-offsetX, -offsetY, 0);
		grp.position.set(-offsetX, -offsetY, 0);
		group3.position.set(offsetX, offsetY, 0);

		scene.add(group3);
	},
	(xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	(error) => {
		console.log(error);
	}
);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}

function animate() {
	requestAnimationFrame(animate);

	controls.update();

	if (group3) {
		group.rotation.z += 0.005;
		group2.rotation.z -= 0.002;
		group3.rotation.y += 0.002;
	}

	render();
}

function render() {
	renderer.render(scene, camera);
}

animate();
