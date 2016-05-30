/**
 * URL控件
 */
u.UrlAdapter = u.StringAdapter.extend({
    init: function () {
        u.UrlAdapter.superclass.init.apply(this);
        this.validType = 'url';
        /*
         * 因为需要输入，因此不显示为超链接
         */
    }
});
u.compMgr.addDataAdapter(
    {
        adapter: u.UrlAdapter,
        name: 'url'
    });


