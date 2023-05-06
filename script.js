import * as THREE from 'three';
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.PointLight(0xffffff, 10, 100);
light.position.set(10, 50, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(3, 5, 8);

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(2.5, 0, 0);

const planeGeometry = new THREE.PlaneGeometry(200, 200);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, -0.1, 0);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const material = new THREE.MeshPhysicalMaterial({
	color: 0x999977,
	roughness: 1.0,
	metalness: 0,
	reflecifity: 0,
});

const materialMetal = new THREE.MeshPhysicalMaterial({
	color: 0x777777,
	roughness: 0.5,
	metalness: 1,
	reflecifity: 1,
});

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
	(xhr) => {},
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
	(xhr) => {},
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
	(xhr) => {},
	(error) => {
		console.log(error);
	}
);

loader.load(
	"models/02_Sockel.stl",
	function (geometry) {
		meshSockel = new THREE.Mesh(geometry, materialMetal);
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
	(xhr) => {},
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

let counter = 0;
let mode = Math.floor(Math.random() * 4);
let stepsPerAnim = 100;

let group1Mov = [];
let group2Mov = [];
let group3Mov = [];

for (let i = 0; i < stepsPerAnim; i++) {
	group1Mov[i] = (Math.PI / 1.6 / stepsPerAnim) * i;
	group2Mov[i] = (-Math.PI / 3 / stepsPerAnim) * i;
	group3Mov[i] = (-Math.PI / 12 / stepsPerAnim) * i;
}

for (let i = 0; i < stepsPerAnim; i++) {
	group1Mov[stepsPerAnim + i] =
		(Math.PI / 1.6 / stepsPerAnim) * (stepsPerAnim - i);
	group2Mov[stepsPerAnim + i] =
		(-Math.PI / 3 / stepsPerAnim) * (stepsPerAnim - i);
	group3Mov[stepsPerAnim + i] =
		(-Math.PI / 12 / stepsPerAnim) * (stepsPerAnim - i);
}

for (let i = 0; i < stepsPerAnim; i++) {
	group1Mov[stepsPerAnim * 2 + i] = (Math.PI / 1.6 / stepsPerAnim) * i;
	group2Mov[stepsPerAnim * 2 + i] = (-Math.PI / 3 / stepsPerAnim) * i;
	group3Mov[stepsPerAnim * 2 + i] = (Math.PI / 12 / stepsPerAnim) * i;
}

for (let i = 0; i < stepsPerAnim; i++) {
	group1Mov[stepsPerAnim * 3 + i] =
		(Math.PI / 1.6 / stepsPerAnim) * (stepsPerAnim - i);
	group2Mov[stepsPerAnim * 3 + i] =
		(-Math.PI / 3 / stepsPerAnim) * (stepsPerAnim - i);
	group3Mov[stepsPerAnim * 3 + i] =
		(Math.PI / 12 / stepsPerAnim) * (stepsPerAnim - i);
}

for (let i = 0; i < stepsPerAnim; i++) {
	group1Mov[stepsPerAnim * 4 + i] = (Math.PI / 3 / stepsPerAnim) * i;
	group2Mov[stepsPerAnim * 4 + i] = (-Math.PI / 4.75 / stepsPerAnim) * i;
	group3Mov[stepsPerAnim * 4 + i] = (-Math.PI / 9 / stepsPerAnim) * i;
}

for (let i = 0; i < stepsPerAnim; i++) {
	group1Mov[stepsPerAnim * 5 + i] =
		(Math.PI / 3 / stepsPerAnim) * (stepsPerAnim - i);
	group2Mov[stepsPerAnim * 5 + i] =
		(-Math.PI / 4.75 / stepsPerAnim) * (stepsPerAnim - i);
	group3Mov[stepsPerAnim * 5 + i] =
		(-Math.PI / 9 / stepsPerAnim) * (stepsPerAnim - i);
}

for (let i = 0; i < stepsPerAnim; i++) {
	group1Mov[stepsPerAnim * 6 + i] = (Math.PI / 3 / stepsPerAnim) * i;
	group2Mov[stepsPerAnim * 6 + i] = (-Math.PI / 4.75 / stepsPerAnim) * i;
	group3Mov[stepsPerAnim * 6 + i] = (Math.PI / 9 / stepsPerAnim) * i;
}

for (let i = 0; i < stepsPerAnim; i++) {
	group1Mov[stepsPerAnim * 7 + i] =
		(Math.PI / 3 / stepsPerAnim) * (stepsPerAnim - i);
	group2Mov[stepsPerAnim * 7 + i] =
		(-Math.PI / 4.75 / stepsPerAnim) * (stepsPerAnim - i);
	group3Mov[stepsPerAnim * 7 + i] =
		(Math.PI / 9 / stepsPerAnim) * (stepsPerAnim - i);
}

function animate() {
	requestAnimationFrame(animate);

	controls.update();

	if (group3) {
		if (counter < stepsPerAnim * 2) {
			group.rotation.z = group1Mov[mode * stepsPerAnim * 2 + counter];
			group2.rotation.z = group2Mov[mode * stepsPerAnim * 2 + counter];
			group3.rotation.y = group3Mov[mode * stepsPerAnim * 2 + counter];
			counter++;
		} else {
			mode = Math.floor(Math.random() * 4);
			counter = 0;
		}
	}

	render();
}

function render() {
	renderer.render(scene, camera);
}

animate();
