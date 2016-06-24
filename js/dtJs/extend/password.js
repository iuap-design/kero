/**
 * 密码控件
 */
u.PassWordAdapter = u.StringAdapter.extend({
    init: function () {
        u.PassWordAdapter.superclass.init.apply(this);
        var oThis = this;
        if(u.isIE8){
            var outStr = this.element.outerHTML;
            var l = outStr.length;
            outStr = outStr.substring(0,l-1) + ' type="password"' + outStr.substring(l-1);
            var newEle = document.createElement(outStr);
            var parent = this.element.parentNode;
            parent.insertBefore(newEle,this.element.nextSibling);
            parent.removeChild(this.element);
            this.element = newEle;
        }else{
            this.element.type = "password";
        }
        oThis.element.title = '';
        this._element = this.element.parentNode;
        this.span = this._element.querySelector("span");
        if(u.isIE8){
            this.span.style.display = 'none';
        }
        if(this.span){
            u.on(this.span,'click',function(){
                if(oThis.element.type == 'password'){
                    oThis.element.type = 'text';
                }else{
                    oThis.element.type = 'password';
                }
            });
        }
        
    },
    setShowValue: function (showValue) {
        this.showValue = showValue;
        this.element.value = showValue;
        this.element.title = '';
    },
});
u.compMgr.addDataAdapter(
    {
        adapter: u.PassWordAdapter,
        name: 'password'
    });


