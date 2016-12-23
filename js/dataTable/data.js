/**
 * Module : kero dataTable data
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/**
 *设置数据
 *
 */
const setData = function (data,options) {
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
        if(data.rows)
            var newTotalRow = data.rows.length;
        else
            var newTotalRow = this.totalRow();
    }
    var select, focus,unSelect=options?options.unSelect:false;

    this.pageIndex(newIndex);
    this.pageSize(newSize);

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
            // 首先删除数据，然后将当前页数据插入
            this.removeAllRows();
            select = this.getPage(newIndex).selectedIndices
            focus = this.getPage(newIndex).focus
            var rows = this.setRows(this.getPage(newIndex).rows, options)
            this.getPage(newIndex).rows = rows;
        }
        // 后台传入totalPages及totalRow才进行更新
        if(data.totalPages){
            this.totalPages(data.totalPages)
        }
        if(data.totalRow || data.totalRow === 0){
            this.totalRow(data.totalRow)
        }
    } else {
        select = data.select||(!unSelect?[0]:[]);
        focus = data.focus !== undefined ? data.focus : data.current;
        this.setRows(data.rows, options);
        this.totalPages(newTotalPages)
        this.totalRow(newTotalRow)
    }
    
    

    this.updateSelectedIndices()

    if (select && select.length > 0 && this.rows().length > 0)
        this.setRowsSelect(select)
    if (focus !== undefined && this.getRow(focus))
        this.setRowFocus(focus)
};



const setValue = function (fieldName, value, row, ctx) {
    if (arguments.length === 1){
        value = fieldName;
        fieldName = '$data';
    }

    row = row ? row : this.getCurrentRow()
    if (row)
        row.setValue(fieldName, value, ctx)
}


export {
    setData,
    setValue
}
