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
    },
    // 如果enable为false则显示<a>标签
    setEnable: function(enable){
        if (enable === true || enable === 'true') {
            this.enable = true;
            this.element.removeAttribute('readonly');
            u.removeClass(this.element.parentNode,'disablecover');
            if(this.aDom){
                this.aDom.style.display = 'none';
            }
        } else if (enable === false || enable === 'false') {
            this.enable = false;
            this.element.setAttribute('readonly', 'readonly');
            u.addClass(this.element.parentNode,'disablecover');
            if(!this.aDom){
                this.aDom = u.makeDOM('<div style="position:absolute;background:#fff;z-index:999;"><a href="' + this.trueValue + '" target="_blank" style="position:absolue;">' + this.trueValue +'</a></div>');
                var left = this.element.offsetLeft;
                var width = this.element.offsetWidth;
                var top = this.element.offsetTop;
                var height = this.element.offsetHeight;
                this.aDom.style.left = left + 'px';
                this.aDom.style.width = width + 'px';
                this.aDom.style.top = top + 'px';
                this.aDom.style.height = height + 'px';
                this.element.parentNode.appendChild(this.aDom);
            }
            var $a = $(this.aDom).find('a');
            $a.href = this.trueValue;
            $a.innerHTML = this.trueValue;
            this.aDom.style.display = 'block';
        }
    }
});
u.compMgr.addDataAdapter(
    {
        adapter: u.UrlAdapter,
        name: 'url'
    });


