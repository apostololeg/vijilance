var $ = require('jquery');
var PubSub = require('pubsub-js');

/**
 * Сахар над ивентами, который не триггерит click после drag
 */
var Events = function(domElem, camera, scene) {
    this.domElem = domElem;
    this.camera = camera;
    this.scene = scene;

    this.domElem.on({
        click: this._onClick.bind(this),
        mousedown: this._onMouseDown.bind(this),
        mousemove: this._onMouseMove.bind(this)
    });
};

$.extend(Events.prototype, {
    on: PubSub.subscribe,
    off: PubSub.unsubscribe,
    trigger: PubSub.publish,

    _onMouseDown: function(e) {
        this._isDrag = true;
        this.pointer = {
            x: e.clientX,
            y: e.clientY
        };
    },

    _onMouseMove: function(e) {
        if (!this._isDrag) {
            return
        }

        var deltaX = Math.abs(e.clientX - this.pointer.x);
        var deltaY = Math.abs(e.clientY - this.pointer.y);

        if (deltaX + deltaY > 10) {
            this._isMove = true;
        }
    },

    _onClick: function(e, data) {
        if (this._isMove) {
            this._isMove = false;
            this._isDrag = false;
            return;
        }

        this.trigger('click', e);
    }
});

module.exports = Events;
