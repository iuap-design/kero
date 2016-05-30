/**
 * 百分比控件
 */
u.PercentAdapter = u.FloatAdapter.extend({
    init: function () {
        u.PercentAdapter.superclass.init.apply(this);
        this.validType = 'float';
        this.maskerMeta = iweb.Core.getMaskerMeta('percent') || {};
        this.maskerMeta.precision = this.getOption('precision') || this.maskerMeta.precision;
        if (this.maskerMeta.precision){
            this.maskerMeta.precision = parseInt(this.maskerMeta.precision) + 2;
        }
        this.formater = new u.NumberFormater(this.maskerMeta.precision);
        this.masker = new PercentMasker(this.maskerMeta);
    }
});
u.compMgr.addDataAdapter(
    {
        adapter: u.PercentAdapter,
        name: 'percent'
    });


