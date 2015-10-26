var $ = require('jquery');
var THREE = require('three');
var orbitControls = require('three-orbit-controls')(THREE);
var PUBLIC_MODELS = 'https://dl.dropboxusercontent.com/u/7624831/scripts/3D%20models/';

var App = function() {
    this.init();
    this.load(PUBLIC_MODELS + 'tor.js');
};

$.extend(App.prototype, {
    init: function(argument) {
        var aspect = window.innerWidth / window.innerHeight;
        this.scene = new THREE.Scene();
        this.light = new THREE.PointLight(0xffffff);
        this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
        this.controls = new orbitControls(this.camera);
        this.renderer = new THREE.WebGLRenderer();
        this.loader = new THREE.JSONLoader();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.light.position.set(-10, 10, 10);
        this.light.exponent = 20;
        this.scene.add(this.light);

        this.camera.position.set(0, 1, -3);
        this.camera.lookAt(new THREE.Vector3());

        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.enableRotate = false;

        this.render();
    },

    render: function() {
        window.requestAnimationFrame(this.render.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    },

    load: function(path) {
        this.loader.load(path, function(geometry, materials) {
            material = new THREE.MeshFaceMaterial(materials);
            mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
        }.bind(this));
    },

    _onClick: function() {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster = new THREE.Raycaster();

        var vector = new THREE.Vector3( mouse.x, mouse.y, 1 ).unproject( camera );

        raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

        var intersects = raycaster.intersectObjects( scene.children );

        INTERSECTED = intersects[ 0 ].object;
    }
})

var app = new App();
console.log(app);
module.exports = app;
