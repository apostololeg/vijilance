BEMTMPL = require('bemtmpl');

require('./explorer.styl');

BEMTMPL.decl('explorer', function(ctx) {
    var items = ctx.items;

    if (!items || items.length === 0) {
        ctx.content({
            elem: 'empty',
            content: 'No items'
        });
    } else {
        ctx.content(items.map(function(item, i) {
            return {
                elem: 'item',
                elemMods: {id: i},
                content: item.name
            };
        }));
    }
})
