// 定义ViewModel
var ViewModel = function(first, last) {
	// ko.observable可实时监听数据，实现绑定
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
 
    this.fullName = ko.pureComputed(function() {
    	// ko.pureComputed用于执行计算，实时返回改变后的结果
        return this.firstName() + " " + this.lastName();
    }, this);
};
 
ko.applyBindings(new ViewModel("Planet", "Earth")); // 通过ko.applyBindings执行knockout