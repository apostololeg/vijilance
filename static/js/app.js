var $ = require('jquery');
var View = require('./view.js');
var PUBLIC_MODELS = 'https://dl.dropboxusercontent.com/u/7624831/scripts/3D%20models/';

var App = function() {
    this.domElem = $('#app');
    this.view = new View(this.domElem);

    this.view.on('select', this._onSelect.bind(this));
    // load test scene
    this.view.load(PUBLIC_MODELS + 'tor.js');
};

$.extend(App.prototype, {
    _onSelect: function(e, data) {
        console.log('_onSelect', data);
    }
});

module.exports = new App();
