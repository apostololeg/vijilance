BEMTMPL = require('bemtmpl');

require('./panel.styl');
require('../tabs/tabs.tmpl.js');

BEMTMPL.decl('panel', function(ctx) {
    ctx.content(BEMTMPL.apply({
        block: 'tabs',
        data: [
            {
                title: 'Explorer',
                content: {
                    block: 'panel',
                    elem: 'explorer'
                }
            },
            {
                title: 'Board',
                content: {
                    block: 'panel',
                    elem: 'board'
                }
            }
        ]
    }));
})
