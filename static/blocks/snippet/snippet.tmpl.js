require('./snippet.css');

module.exports = function(data) {
    var visibilityClass = data.visible ? ' snippet__indicator_visible_yes' : '';

    return ['div', {class: 'snippet', id: data.id},
        data.name || 'No name',
        ['div', {class: 'snippet__indicator' + visibilityClass}]
    ];
}
