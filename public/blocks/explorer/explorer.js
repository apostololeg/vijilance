var BEMTMPl = require('bemtmpl');
var $ = require('jquery');

require('./explorer.tmpl.js');

function Explorer(domElem, data) {
    this.domElem = domElem;
    this.data = data;
    this.show(data);

    $(document).on('click', '.explorer__item', this._onClick.bind(this));
}

$.extend(Explorer.prototype, {
    show: function(data) {
        this.domElem.append(BEMTMPL.apply({
            block: 'explorer',
            items: data.children
        }));
    },
    _onClick: function(e) {
        var target = $(e.target);
        var block = target.closest('.explorer');
        var item = block.elem(target, 'item');
        var obj = this.data.children[item.mod('id')];

        block.nextAll().remove();
        this.show(obj);
    }
});

module.exports = Explorer;
