import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.PointLight(0xffffff);
light.position.set(3, 5, 10);
light.castShadow = true;
scene.add(light);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(3, 5, 8);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(2.5, 0, 0);

const textureLoader = new THREE.TextureLoader();
const objLoader = new OBJLoader();

const materialMetal = new THREE.MeshStandardMaterial({
	metalness: 1,
	roughness: 0.5,
});

const group = new THREE.Group();
const group2 = new THREE.Group();
const group3 = new THREE.Group();

const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, -0.1, 0);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

let textureWood, materialWood;

let p1 = loadTexture("textures/wood.jpg").then((result) => {
	textureWood = result;
});

let objGrundplatte, objSockel, objAusleger1, objAusleger2;

let p2 = loadModel("models/04_Ausleger_2.obj").then((result) => {
	objAusleger2 = result.children[0];
});

let p3 = loadModel("models/03_Ausleger_1.obj").then((result) => {
	objAusleger1 = result.children[0];
});

let p4 = loadModel("models/02_Sockel.obj").then((result) => {
	objSockel = result.children[0];
});

let p5 = loadModel("models/01_Grundplatte.obj").then((result) => {
	objGrundplatte = result.children[0];
});

Promise.all([p1, p2, p3, p4, p5]).then(() => {
	let offsetX, offsetY;

	textureWood.wrapS = THREE.RepeatWrapping;
	textureWood.wrapT = THREE.RepeatWrapping;
	textureWood.repeat.set(3, 3);

	materialWood = new THREE.MeshPhysicalMaterial({
		map: textureWood,
	});

	objAusleger2.castShadow = true;
	objAusleger2.material = materialWood;
	group.add(objAusleger2);
	offsetX = 1.299;
	offsetY = 3.45;
	objAusleger2.position.set(-offsetX, -offsetY, 0);
	group.position.set(offsetX, offsetY, 0);
	scene.add(group);

	objAusleger1.castShadow = true;
	objAusleger1.material = materialWood;
	group2.add(objAusleger1);
	let grp = new THREE.Group();
	grp.add(group);
	group2.add(grp);
	offsetX = 0.9;
	offsetY = 0.6;
	objAusleger1.position.set(-offsetX, -offsetY, 0);
	grp.position.set(-offsetX, -offsetY, 0);
	group2.position.set(offsetX, offsetY, 0);
	scene.add(group2);

	objSockel.castShadow = true;
	objSockel.material = materialMetal;
	group3.add(objSockel);
	grp = new THREE.Group();
	grp.add(group2);
	group3.add(grp);
	offsetX = 0.9;
	offsetY = 0.6;
	objSockel.position.set(-offsetX, -offsetY, 0);
	grp.position.set(-offsetX, -offsetY, 0);
	group3.position.set(offsetX, offsetY, 0);
	scene.add(group3);

	objGrundplatte.castShadow = true;
	objGrundplatte.receiveShadow = true;
	objGrundplatte.material = materialWood;
	objGrundplatte.geometry.computeVertexNormals();
	scene.add(objGrundplatte);

	animate();
});

window.addEventListener("resize", onWindowResize, false);

// Demo
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

function loadTexture(url) {
	return new Promise((resolve) => {
		textureLoader.load(url, resolve);
	});
}

function loadModel(url) {
	return new Promise((resolve) => {
		objLoader.load(url, resolve);
	});
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

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}
