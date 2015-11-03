var $ = require('jquery');

function Tabs() {
    $(document).on('click', '.tabs__tab', this._onTabClick.bind(this));
}

$.extend(Tabs.prototype, {
    _onTabClick: function(e) {
        var target = $(e.target)
            tabs = target.closest('.tabs'),
            currentTab = tabs.elem(target, 'tab'),
            id = currentTab.mod('id');

        // clear active
        tabs.elem('tab').byMod('active').delMod('active');
        tabs.elem('pane').byMod('active').delMod('active');
        // set active
        tabs.elem('tab').byMod('id', id).setMod('active');
        tabs.elem('pane').byMod('id', id).setMod('active');
    }
});

module.exports = new Tabs();
