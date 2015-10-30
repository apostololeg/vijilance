var $ = require('jquery');
var THREE = require('three');
var orbitControls = require('three-orbit-controls')(THREE);
var Events = require('./events.js');
var EventEmmiter = require('pubsub-js');

var View = function(domElem) {
    this.domElem = domElem;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer(this.domElem[0]);
    this.loader = new THREE.JSONLoader();

    this._addRenderer();
    this._setDefaultLight();
    this._setDefaultCamera();
    this._setOrbitControls();
    this._setEvents();

    this.render();
};

$.extend(View.prototype, {

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

    select: function(obj) {
        this.selected = obj;
        console.log('selected', obj);
    },

    _addRenderer: function() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.domElem.append(this.renderer.domElement);
    },

    _setDefaultLight: function() {
        this.light = new THREE.PointLight(0xffffff);
        this.light.position.set(-10, 10, 10);
        this.light.exponent = 20;
        this.scene.add(this.light);
    },

    _setDefaultCamera: function() {
        var aspect = window.innerWidth / window.innerHeight;

        this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
        this.camera.position.set(0, 5, 3);
        this.camera.lookAt(new THREE.Vector3());
    },

    _setOrbitControls: function() {
        this.controls = new orbitControls(this.camera);
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.enableRotate = false;
    },

    _setEvents: function() {
        var events = new Events(this.renderer.domElement);

        events.on('click', this._onClick.bind(this));
        this.on = EventEmmiter.subscribe.bind(this);
        this.off = EventEmmiter.unsubscribe.bind(this);
        this.trigger = EventEmmiter.publish.bind(this);
    },

    _onClick: function(e, data) {
        var intersect = this._getIntersect(data.clientX, data.clientY);
        if (intersect) {
            this.trigger('select', intersect);
            this.select(data.object);
        }
    },

    _getIntersect: function(x, y) {
        var mouseX = (x / window.innerWidth) * 2 - 1,
            mouseY = -(y / window.innerHeight) * 2 + 1,
            camPos = this.camera.position,
            vector = new THREE.Vector3(mouseX, mouseY, 1).unproject(this.camera),
            direction = vector.sub(camPos).normalize(),
            raycaster = new THREE.Raycaster(),
            intersected;

        raycaster.set(camPos, direction);
        return raycaster.intersectObjects(this.scene.children)[0];
    }

});

module.exports = View;
