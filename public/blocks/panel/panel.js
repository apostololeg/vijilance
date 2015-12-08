require('jquery-bem');

var $ = require('jquery');
var THREE = require('three');
var BEMTMPL = require('bemtmpl');
var Explorer = require('../explorer/explorer.js');

require('three-loaders-collada')(THREE);
require('../common/common.styl');
require('./panel.styl');
require('./panel.tmpl.js');

/**
 * @constructor
 */
function Panel() {
    this.loader = new THREE.ColladaLoader();

    this._render();
    this._connectSocket();
    // this.explorer = new Explorer(this.domElem.elem('explorer'));
};

$.extend(Panel.prototype, {
    load: function (path) {
        this.loader.load(path, function(collada) {
            var dae = collada.scene;
        });
    },
    _render: function (container) {
        $('body').append(BEMTMPL.apply({ block: 'panel' }));
        this.domElem = $('.panel');
    },
    _connectSocket: function() {
        this.socket = require('socket.io-client')('http://localhost:3000');

        this.socket.on({
            connect: function() {
                console.log('connected', arguments);
            },
            event: function(data) {
                console.log('panel event', data);
            },
            load: function(data) {
                console.log('panel loaded', data);
            },
            disconnect: function() {
                console.log('disconnected', arguments);
            }
        });
    }
});

module.exports = Panel;

// ===========================
var panel = new Panel();
