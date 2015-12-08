BEMTMPL = require('bemtmpl');

require('./tabs.js');
require('./tabs.styl');

/**
 * Tabs
 * @param {Object} ctx
 * @param {Array} ctx.data – tabs/panes data
 * @param {Number} ctx.activeIndex – index of active tab
 */
BEMTMPL.decl('tabs', function(ctx) {
    var titles = [],
        panes = [];

    function elem(name, content, id) {
        var mods = { id: id };

        if (id === ctx.activeIndex) {
            mods.active = 'yes';
        }

        return {
            elem: name,
            content: content,
            elemMods: mods
        };
    }

    ctx.data.forEach(function(item, i) {
        titles.push(elem('tab', item.title, i));
        panes.push(elem('pane', item.content, i));
    });

    ctx.mods({ layout: 'simple' });
    ctx.content([
        { elem: 'head', content: titles },
        { elem: 'panes', content: panes }
    ]);
})
