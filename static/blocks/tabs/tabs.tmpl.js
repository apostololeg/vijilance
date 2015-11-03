require('./tabs.js');
require('./tabs.css');

var format = require('util').format;
var _tmpl = function(name, content, id) {
    var elemCls = 'tabs__' + name,
        cls = format('%s %s_id_%s', elemCls, elemCls, id),
        activeCls = id === 0
            ? format(' %s_active', elemCls)
            : '';

    return ['div', {class: cls + activeCls}, content];
};

module.exports = function(items) {
    var titles = [],
        content = [];

    items.forEach(function(item, i) {
        titles.push(_tmpl('tab', item.title, i));
        content.push(_tmpl('pane', item.content, i));
    });

    return ['div', {class: 'tabs'},
        ['div', {class: 'tabs__head'}].concat(titles),
        ['div', {class: 'tabs__panes'}].concat(content)
    ];
}
