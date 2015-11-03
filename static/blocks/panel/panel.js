var $ = require('jquery');
var THREE = require('three');

var microjungle = require('microjungle');
var _card = require('../card/card.tmpl.js');

require('./panel.css');

function Panel(domElem) {
    this.domElem = domElem;
    this.domElem.on('click', '.snippet', this._onSnippetClick.bind(this));
};

$.extend(Panel.prototype, {
    show: function(obj) {
        var card = microjungle([_card(obj)]);

        this.obj = obj;
        this.domElem.append(card);
    },
    _onSnippetClick: function(e, data) {
        var id = e.target.prop('id');

        // show selected object
        this.obj.children.each(function(child) {
            if (child.id === id) {
                this.show(child);
                return false;
            }
        }.bind(this));
    }
});

module.exports = Panel;
