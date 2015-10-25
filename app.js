var PUBLIC_MODELS = 'https://dl.dropboxusercontent.com/u/7624831/scripts/3D%20models/';

var aspect = window.innerWidth / window.innerHeight;
var scene = new THREE.Scene();
var light = new THREE.PointLight(0xffffff);
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
var controls = new THREE.OrbitControls(camera);
var renderer = new THREE.WebGLRenderer();
var loader = new THREE.JSONLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

light.position.set(-10, 10, 10);
light.exponent = 20;
scene.add(light);

loader.load(PUBLIC_MODELS + 'ring.js', function(geometry, materials) {
    console.log(geometry, materials);
    material = new THREE.MeshFaceMaterial(materials);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
});

var render = function() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};

render();
