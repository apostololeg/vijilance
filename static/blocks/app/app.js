require('../../lib/jquery-bem.js');

var $ = require('jquery');
var THREE = require('three');
var PUBLIC_MODELS = 'https://dl.dropboxusercontent.com/u/7624831/scripts/3D%20models/';

var View = require('../view/view.js');
var Panel = require('../panel/panel.js');

require('../common/common.css');

var App = function() {
    this.domElem = $('#app');
    this.view = new View($('#view'));
    this.panel = new Panel($('#panel'));

    this.view.on('select', this._onSelect.bind(this));
    this.view.on('load', this._onLoad.bind(this));

    this.view.load('/models/objects.dae');
};

$.extend(App.prototype, {
    _onSelect: function(e, data) {
        console.log('_onSelect', data);
    },
    _onLoad: function(e, data) {
        // показываем все объекты на панели
        this.panel.show(data);
    }
});

module.exports = new App();
