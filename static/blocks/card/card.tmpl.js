require('./card.styl');

var _tabs = require('../tabs/tabs.tmpl.js');
var _snippet = require('../snippet/snippet.tmpl.js');

module.exports = function(data) {
    return ['div', {class: 'card', id: data.id},
        ['div', {class: 'card__header'},
            data.parent && ['div', {class: 'card__up fa-angle-double-left'}],
            ['div', {class: 'card__title'}, data.name || 'No name'],
        ],
        _tabs([
            {
                title: 'Animations',
                content: ['div', {class: 'card__attrs'}].concat('foo ...')
            },
            {
                title: 'Childs',
                content: ['div', {class: 'card__childs'}].concat(data.children.map(_snippet))
            }
        ])
    ];
};
