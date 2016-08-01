/**
 * Module : kero dataTable data
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/** 
 *设置数据
 *
 */
var setData = function (data,options) {
    if(data.pageIndex || data.pageIndex === 0){
        var newIndex = data.pageIndex;
    }else{
        var newIndex = this.pageIndex();
    }
    if(data.pageSize || data.pageSize === 0){
        var newSize = data.pageSize;
    }else{
        var newSize = this.pageSize();
    }
    if(data.totalPages || data.totalPages === 0){
        var newTotalPages = data.totalPages;
    }else{
        var newTotalPages = this.totalPages();
    }
    if(data.totalRow || data.totalRow === 0){
        var newTotalRow = data.totalRow;
    }else{
        var newTotalRow = data.rows.length; //后续要考虑状态，del的不计算在内
    }
    var select, focus,unSelect=options?options.unSelect:false; 
        //currPage,
        //type = data.type;

    this.pageCache = data.pageCache || this.pageCache
    if (this.pageCache === true) {
        this.updatePages(data.pages)
        if (newIndex != this.pageIndex()) {
            this.setCurrentPage(newIndex, true);
            this.totalPages(newTotalPages)
            this.totalRow(newTotalRow)
            return;
        }
        else {
            select = this.getPage(newIndex).selectedIndices
            focus = this.getPage(newIndex).focus
            this.setRows(this.getPage(newIndex).rows)
        }
    } else {
        select = data.select||(!unSelect?[0]:[]);
        focus = data.focus;
        this.setRows(data.rows)
    }
    this.pageIndex(newIndex)
    this.pageSize(newSize)
    this.totalPages(newTotalPages)
    this.totalRow(newTotalRow)

    this.updateSelectedIndices()

    if (select && select.length > 0 && this.rows().length > 0)
        this.setRowsSelect(select)
    if (focus)
        this.setRowFocus(focus)
};

/**
 * 获取数据,只取字段名与字段值
 */
var getSimpleData = function(options){
    options = options || {}
    var rows,_rowData = [], type = options['type'] || 'all', fields = options['fields'] || null;

    if (type === 'all') {
        rows = this.rows.peek();
    }else if (type === 'current'){
        var currRow = this.getCurrentRow();
        rows = currRow == null ? [] :  [currRow];
    }else if (type === 'focus'){
        var focusRow = this.getFocusRow();
        rows = focusRow == null ? [] :  [focusRow];
    }else if (type === 'select'){
        rows = this.getSelectedRows();
    }else if (type === 'change'){
        rows = this.getChangedRows();
    }

    for(var i = 0; i< rows.length; i++){
        _rowData.push(rows[i].getSimpleData({fields:fields}));
    }
    return _rowData;
};

/**
 * 设置数据, 只设置字段值
 * @param {array} data
 *options{} unSelect为true：不选中，为false则选中，默认选中0行
 */
var setSimpleData = function(data,options){
    //this.clear();
    this.removeAllRows();
    this.cachedPages = [];
    //this.totalPages(1);
    //this.pageIndex(0);
    this.focusIndex(-1);
    this.selectedIndices([]);

    if (!data){
        // throw new Error("dataTable.setSimpleData param can't be null!");
        return;
    }
    
    var rows = [];
    if (!u.isArray(data))
        data = [data];
    for (var i =0; i< data.length; i++){
        var _data = data[i];
        /* 判断data中的字段在datatable中是否存在，如果不存在则创建 */
        // for(var f in _data){
        //     this.createField(f)
        // }
        if (typeof data[i] !== 'object')
            _data = {$data:data[i]}
        rows.push({
            status: Row.STATUS.NORMAL,
            data: _data
        })
    }
    var _data = {
        rows: rows
    }
    this.setData(_data,options);
};


/**
 * 追加数据
 * @param data
 */
var addSimpleData = function(data, status){
    if (!data){
        throw new Error("dataTable.addSimpleData param can't be null!");
    }
    if (!u.isArray(data))
        data = [data];
    for (var i =0; i< data.length; i++){
        var r = this.createEmptyRow();
        r.setSimpleData(data[i],status);
    }

}

/**
 * 清空datatable的所有数据以及分页数据以及index
 */
var clear = function () {
    this.removeAllRows();
    this.cachedPages = [];
    this.totalPages(1);
    this.pageIndex(0);
    this.focusIndex(-1);
    this.selectedIndices([]);
}



export {
    setData,
    getSimpleData,
    setSimpleData,
    addSimpleData,
    clear
}