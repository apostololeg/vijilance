var BEMTMPl = require('bemtmpl');

require('./card.styl');
require('../tabs/tabs.tmpl.js');
require('../snippet/snippet.tmpl.js');

BEMTMPl.decl('explorer', function(ctx) {
    var data = ctx.data;

    ctx.content([
        {
            elem: 'header',
            content: [
                data.parent && {
                    elem: 'up',
                    mix: { block: 'fa-angle-double-left' }
                },
                { elem: 'title', content: data.name || 'No name' }
            ]
        },
        BEMTMPl.apply({
            block: 'tabs',
            mix: { block: 'card', elem: 'content' },
            mods: { layout: 'shelf' },
            data: [
                {
                    title: 'Childs',
                    content: [
                        {
                            block: 'card',
                            elem: 'childs',
                            content: data.children.map(function(child) {
                                return BEMTMPl.apply({
                                    block: 'snippet',
                                    data: child
                                });
                            })
                        }
                    ]
                },
                {
                    title: 'Animations',
                    content: { elem: 'attrs', content: 'asdasdasd' }
                }
            ]
        })
    ]);
});
