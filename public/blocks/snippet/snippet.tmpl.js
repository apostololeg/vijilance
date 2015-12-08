var BEMTMPL = require('bemtmpl');

require('./snippet.styl');

BEMTMPL.decl('snippet', function(ctx) {
    var data = ctx.data;

    ctx.attrs({id: data.id});
    ctx.content([
        data.name || 'No name',
        {
            elem: 'indicator',
            mods: data.visible && { visible: 'yes' }
        }
    ]);
});
